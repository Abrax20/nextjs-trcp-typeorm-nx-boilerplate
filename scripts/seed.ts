import { runSeeders } from 'typeorm-extension';
import { appDataSource } from '../libs/database/src/source';

// eslint-disable-next-line unicorn/prefer-top-level-await
(async () => {
  await appDataSource.initialize();
  runSeeders(appDataSource, {
    seeds: ['seeds/*.ts'],
    factories: [],
  });
})();
