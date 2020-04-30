import { Schema, Document, model } from 'mongoose';

export interface IAuthKey extends Document {
  name: string;
  email: string;
}

const AuthKeySchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
});

export default model<IAuthKey>('AuthKey', AuthKeySchema);
