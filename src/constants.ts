export const defaultProtocol = process.env.HTTPS ? 'https' : 'http';
export const defaultPort = +(process.env.PORT || 9000);
export const defaultPiletPath = `/api/v1/pilet`;
export const defaultFilePath = '/static/files(/@:org)?/:name/:version/:file?';
export const defaultMongoSettings = {
	active: true,
	host: 'mongodb://localhost/piral-server',
	port: '27017',
};
export const storage = {
	providers: process.env.STORAGE_PROVIDERS 
		? process.env.STORAGE_PROVIDERS.split(',') 
		: ['local'] // 'local', 'aws'
};