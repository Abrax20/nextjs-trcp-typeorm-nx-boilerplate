import UrlValueParser from 'url-value-parser';

export default (path: string, routePath: string): string => {
  const parser = new UrlValueParser();
  const masks = routePath.split('/').filter((part) => part.startsWith(':'));
  const { chunks, valueIndexes } = parser.parsePathValues(path);

  if (valueIndexes.length === 0 && masks.length > 0) {
    return `${path}${routePath}`.replace('//', '/');
  }

  if (masks.length === 0) {
    return path;
  }

  return [
    '',
    ...chunks.map((chunk: string, index: number) =>
      valueIndexes.includes(index) ? masks.shift() : chunk
    ),
  ].join('/');
};
