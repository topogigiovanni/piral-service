import * as express from 'express';
import * as responseTime from 'response-time';
import * as cors from 'cors';
import * as busboy from 'connect-busboy';
import { withGql } from './resolvers';
import { checkAuth } from './middleware';
import { publishPilet, getLatestPilets, saveAuthKey } from './endpoints';
import { defaultMongoSettings, defaultPiletPath, defaultFilePath, defaultPort, defaultProtocol } from './constants';
import { start as startMongo } from './db/mongodb';

process.on('uncaughtException', (err: any) => {
  console.log('uncaughtException', err);
});

if (defaultMongoSettings.active) {
  startMongo();
}

export function getBaseUrl() {
  const port = defaultPort;
  const protocol = process.env.HTTP_X_FORWARDED_PROTO || defaultProtocol;
  const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;
  return `${protocol}://${host}`;
}

export interface AppOptions {
  piletPath?: string;
  filePath?: string;
  rootUrl?: string;
  port?: number;
}

export function runApp({
  filePath = defaultFilePath,
  piletPath = defaultPiletPath,
  port = defaultPort,
  rootUrl = getBaseUrl(),
}: AppOptions = {}) {
  const app = express();

  app.use(
    cors({
      origin: '*',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(responseTime());
  app.use(
    busboy({
      highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
      limits: {
        fileSize: 32 * 1024 * 1024, // Set 32MiB limit
      },
    }),
  );

  app.use('/static', express.static('static'));

  app.get(piletPath, getLatestPilets());

  app.post(piletPath, checkAuth(), publishPilet(rootUrl));

  app.post('/api/v1/authkey', saveAuthKey());

  return withGql(app).listen(port, () => {
    console.info(`Pilet feed fervice started on port ${port}.`);
    console.info(``);
    console.info(`  URL for uploading pilets:`);
    console.info(``);
    console.info(`    ${rootUrl}${piletPath}`);
    console.info(``);
  });
}
