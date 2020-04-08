import * as mongoose from 'mongoose';
import { defaultMongoSettings } from '../../constants';

export const start = () => {
  const mongoUri = defaultMongoSettings.host;
	mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useCreateIndex: true,
	});

  mongoose.connection.on('error', () => {
    console.log(`unable to connect to database: ${mongoUri}`);
  });
};