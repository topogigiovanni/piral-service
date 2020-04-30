import { Schema, Document, model } from 'mongoose';
import { PiletMetadata } from '../../types';

export interface IPilet extends Document {
  name: string;
  meta: PiletMetadata;
  root: string;
}

const PiletsSchema = new Schema({
  name: {
    type: String,
  },
  meta: {
    type: Object,
  },
  root: {
    type: String,
  },
});

export default model<IPilet>('Pilet', PiletsSchema);
