import { RequestHandler } from 'express';
import { getKeys } from '../auth';

const authHeaderExtract = /^basic\s+([a-fA-F0-9]+)$/i;

async function checkKey(authHeader: string, scopes: Array<string>) {
  const keys = await getKeys();
  const result = authHeaderExtract.exec(authHeader);
  return result && keys.includes(result[1]);
}

export const checkAuth = (...scopes: Array<string>): RequestHandler => async (req, res, next) => {
  const authorized = await checkKey(req.headers.authorization, scopes);

  if (!authorized) {
    res.status(401).json({
      success: false,
      message: 'Invalid API key supplied.',
    });
  } else {
    next();
  }
};
