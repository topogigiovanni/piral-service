import { getPilets, setPilet } from '../db';
import { getPiletDefinition, storeFile } from '../helpers';
import { PiletMetadata } from '../types';
import { defaultCdn } from '../constants';
import { getBaseUrl } from '../app';

function piletHandler(pilet: PiletMetadata) {
  delete pilet.basePath;

  if (defaultCdn.active) {
    const baseUrl = getBaseUrl();
    pilet.link = pilet.link.replace(baseUrl, defaultCdn.url);
  }

  return pilet;
}

export async function latestPilets() {
  const pilets = await getPilets();
  const unique = pilets.reduce((prev, curr) => {
    prev[curr.meta.name] = piletHandler(curr.meta);
    return prev;
  }, {} as Record<string, PiletMetadata>);
  return Object.keys(unique).map((name) => unique[name]);
}

export async function storePilet(file: NodeJS.ReadableStream, rootUrl: string) {
  const meta = await getPiletDefinition(file, rootUrl);
  // debugger;
  const storageResult = await storeFile(meta.files, meta.meta.basePath);
  console.log('storageResult', storageResult);

  await setPilet(meta);
}
