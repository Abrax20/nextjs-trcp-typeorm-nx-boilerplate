import { connectRedis } from '@sprindt/database';

import { env } from '../../../../env.mjs';

export const redis = connectRedis({
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
  port: parseInt(env.REDIS_PORT, 10),
  db: parseInt(env.REDIS_DATABASE, 10),
  ...(env.DEBUG
    ? {}
    : {
        tls: {
          servername: env.REDIS_HOST,
          port: parseInt(env.REDIS_PORT, 10),
        },
      }),
  ...(env.REDIS_USERNAME ? { username: env.REDIS_USERNAME } : {}),
});
