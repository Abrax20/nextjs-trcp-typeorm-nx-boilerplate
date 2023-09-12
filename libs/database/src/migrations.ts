/* eslint-disable @typescript-eslint/no-var-requires,global-require */

const normalizedPath = require('path').join(__dirname, 'migrations');

export function getMigrations() {
  const files = require('fs').readdirSync(normalizedPath);
  // eslint-disable-next-line import/no-dynamic-require
  return files.map((file) => require(`./migration/${file}`).default);
}
