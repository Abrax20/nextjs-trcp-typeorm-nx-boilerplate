import etag from 'etag';
import { RequestHandler } from 'express';

export const etagMiddleware: RequestHandler = (request, response, next) => {
  response.addEtag = (value: string | Buffer | unknown, etagValue?: string) => {
    const etagHeader =
      etagValue ||
      (Buffer.isBuffer(value) ? etag(value) : etag(JSON.stringify(value)));
    response.removeHeader('Expires');
    response.removeHeader('Pragma');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('ETag', etagHeader);
  };
  next();
};
