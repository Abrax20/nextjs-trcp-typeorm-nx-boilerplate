/*
import path from 'path';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { Direction, Format, TypeormUml } from 'typeorm-uml';

import { RequestInfo, RequestInit } from 'node-fetch';
import { appDataSource } from '../libs/database/src/source';

const fetch = (url: RequestInfo, init?: RequestInit) =>
  // eslint-disable-next-line node/no-unsupported-features/es-syntax,@typescript-eslint/no-shadow
  import('node-fetch').then(({ default: fetch }) => fetch(url, init));

// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
  await appDataSource.initialize();
  const diagramURL = await new TypeormUml().build(appDataSource, {
    monochrome: true,
    format: Format.SVG,
    direction: Direction.TB,
  });

  const pathname = path.join('./docs');
  if (!existsSync(pathname)) await mkdir(pathname);
  const response = await fetch(diagramURL);
  const blob = await response.blob();
  const stream = blob.stream();
  const filePath = path.join(pathname, 'diagram.svg');
  await writeFile(filePath, stream);
})();
*/
