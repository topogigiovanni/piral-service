import { writeFileSync } from 'fs';
import * as mkdirp from 'mkdirp';
import { dirname } from 'path';
import { PackageFiles } from '../types';
import { storage } from '../constants';
import { asyncForEach } from './async';

const localProvider = async (files: PackageFiles, basePath: string) => {
	debugger;
  basePath = basePath.replace('/', '');
  // basePath = dirname((`${basePath}/`).replace('/', ''));
	console.log(files, basePath);

  asyncForEach(Object.keys(files), async (fileName: string) => {
    const filePath = `${basePath}/${fileName}`
    console.log('filePath', filePath);
    mkdirp.sync(dirname(filePath));
    writeFileSync(filePath, files[fileName]);
  });
};	

const providers: Record<string, Function> = {
	local: localProvider
};

export async function storeFile(files: PackageFiles, basePath: string) {
  const providersList: Array<string> = storage.providers;

  providersList.forEach((name: string) => {
  	const invoker = providers[name];
  	if (invoker) {
  		invoker(files, basePath);
  	}
  });
}
