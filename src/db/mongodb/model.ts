import { Schema, Document, model } from 'mongoose';
import { PiletMetadata, PackageFiles } from '../../types';

export interface IPilet extends Document {
  name: string;
  meta: PiletMetadata;
  root: string;
  files: PackageFiles;
}

const PiletsSchema = new Schema({
  name: {
  	type: String
  },
  meta: {
    type: Object
  },
  root: {
    type: String
  },
  files: {
    type: Object
  }
});

export default model<IPilet>('Pilet', PiletsSchema);