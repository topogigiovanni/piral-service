import { writeFileSync } from 'fs';
import * as mkdirp from 'mkdirp';
import * as mimeTypes from 'mime-types';
import * as AWS from 'aws-sdk';
import { dirname } from 'path';
import { PackageFiles } from '../types';
import { storage } from '../constants';
import { asyncForEach } from './async';

const awsProvider = async (files: PackageFiles, basePath: string) => {
  basePath = basePath.replace('/', '');
  const s3bucket = new AWS.S3({
    accessKeyId: storage.awsSettings.accessKeyId as string,
    secretAccessKey: storage.awsSettings.secretAccessKey as string,
  });

  asyncForEach(Object.keys(files), async (fileName: string) => {
    console.log('lookup', mimeTypes.lookup(fileName));
    const filePath = `${basePath}/${fileName}`
    const params = {
      Bucket: storage.awsSettings.bucket,
      Key: filePath,
      Body: files[fileName],
      ContentDisposition: 'inline',
      ContentType: mimeTypes.lookup(fileName) as string,
      ACL: 'public-read'
    };
    s3bucket.upload(params, function(err: any, data: any) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
    });
  });
};

const localProvider = async (files: PackageFiles, basePath: string) => {
  basePath = basePath.replace('/', '');

  asyncForEach(Object.keys(files), async (fileName: string) => {
    const filePath = `${basePath}/${fileName}`
    console.log('filePath', filePath);
    mkdirp.sync(dirname(filePath));
    writeFileSync(filePath, files[fileName]);
  });
};	

const providers: Record<string, Function> = {
	local: localProvider,
  aws: awsProvider
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
