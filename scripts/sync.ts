/*

import { connectDatabase, Migration } from '@sprindt/database';
import moment from 'moment';
import { getMigrations } from '../libs/database/src/migrations';
// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
  const source = await connectDatabase(
    {
      port: config.get('database.port'),
      host: config.get('database.host'),
      username: config.get('database.username'),
      password: config.get('database.password'),
      database: config.get('database.database'),
    },
    [Migration]
  );
  await source.synchronize();
  const migrations = getMigrations();

  await Migration.delete({});
  for (const migration of migrations) {
    // @ts-ignore Unknown
    const object = Migration.create({
      name: migration.name,
      timestamp: moment().unix(),
    });

    // @ts-ignore Unknown
    await object.save();
  }
})();
*/
