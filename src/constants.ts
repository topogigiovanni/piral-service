const ENV = process.env || {};

export const defaultProtocol = ENV.HTTPS ? 'https' : 'http';
export const defaultPort = +(ENV.PORT || 9000);
export const defaultPiletPath = `/api/v1/pilet`;
export const defaultFilePath = '/static/files(/@:org)?/:name/:version/:file?';
export const defaultMongoSettings = {
	active: true,
	host: 'mongodb://localhost/piral-server',
	port: '27017',
};
export const storage = {
	providers: ENV.STORAGE_PROVIDERS 
	? ENV.STORAGE_PROVIDERS.split(',') 
  : ['local'], // 'local', 'aws'
};
export const defaultCdn = {
  active: Boolean(ENV.CDN_ACTIVE || true),
  url: ENV.CDN_ACTIVE || 'https://dkrfjfbr3di33.cloudfront.net'
};