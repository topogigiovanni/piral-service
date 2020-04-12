import * as dotenv from 'dotenv';

dotenv.config();

export const nodeEnv = process.env.NODE_ENV || 'development';

if (nodeEnv != 'production') {
  dotenv.config({ path: `${__dirname}/../.env.${nodeEnv}` });
}

const ENV = process.env || {};

export const defaultProtocol = ENV.HTTPS ? 'https' : 'http';
export const defaultPort = +(ENV.PORT || 9000);
export const defaultPiletPath = `/api/v1/pilet`;
export const defaultFilePath = '/static/files(/@:org)?/:name/:version/:file?';
export const defaultMongoSettings = {
	active: ENV.MONGO_ACTIVE || false,
	host: ENV.MONGO_HOST || 'mongodb://localhost/piral-server',
	port: ENV.MONGO_PORT || '27017',
};
export const storage = {
	providers: ENV.STORAGE_PROVIDERS 
  	? ENV.STORAGE_PROVIDERS.split(',') 
    : ['local'], // 'local', 'aws'
  awsSettings: {
    accessKeyId: ENV.S3_USER_KEY,
    secretAccessKey: ENV.S3_USER_SECRET,
    bucket: ENV.S3_BUCKET_NAME,
    acl: ENV.S3_ACL || null //'public-read'
  }  
};
export const defaultCdn = {
  active: Boolean(ENV.CDN_ACTIVE || false),
  url: ENV.CDN_URL || 'https://dkrfjfbr3di33.cloudfront.net'
};