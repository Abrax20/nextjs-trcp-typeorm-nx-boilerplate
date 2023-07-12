export function decodeBase64(data: string) {
  return Buffer.from(data, 'base64').toString('ascii');
}
