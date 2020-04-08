import { Pilet as IPilet, PackageFiles, PiletMetadata } from '../types';
import { defaultMongoSettings } from '../constants';
import PiletModel from './mongodb/model';

const usingMongo = defaultMongoSettings.active;

class Pilet implements IPilet {
  name?: string;
  meta: PiletMetadata;
  root: string;
  files: PackageFiles;
  constructor(pilet: any) {
    this.name = pilet.name;
    this.meta = pilet.meta;
    this.root = pilet.root;
    this.files = pilet.files;
  }
}

const piletData: Record<string, Record<string, Pilet>> = {};
let piletDataLoaded = false;

async function getPiletData() : Promise<Record<string, Record<string, Pilet>>> {
  if (!piletDataLoaded && usingMongo) {
    const piletLIst = await PiletModel.find();
    if (piletLIst) {
      piletDataLoaded = true;
      piletLIst.forEach((p: Pilet) => {
        if (!p) {
          return;
        }
        const current = piletData[p.name] || {};
        piletData[p.name] = {
          ...current,
          [p.meta.version]: new Pilet(p)
        };
      });
    }
  }

  return piletData;
}

export async function getPilets(): Promise<Array<Pilet>> {
  const pilets: Array<Pilet> = [];

  const data = await getPiletData();

  Object.keys(data).forEach(name =>
    Object.keys(data[name]).forEach(version => {
      const pilet = data[name][version];
      pilets.push(pilet);
    }),
  );

  return pilets;
}

export async function getPilet(name: string, version: string): Promise<Pilet | undefined> {
  const data = await getPiletData();

  const versions = data[name] || {};
  // debugger;
  return versions[version];
}

export async function setPilet(pilet: Pilet) {
  if (usingMongo) {
    const result =  await setMongoPilet(pilet);
    console.log(result);
    // debugger;
  }

  const meta = pilet.meta;
  const current = piletData[meta.name] || {};
  piletData[meta.name] = {
    ...current,
    [meta.version]: pilet,
  };  
}

async function setMongoPilet(pilet: Pilet) {
  // debugger;
  const meta = pilet.meta;

  const doc = await PiletModel.findOneAndUpdate({name: meta.name}, pilet, {
    new: true,
    upsert: true // Make this update into an upsert
  });

  return doc;
}
