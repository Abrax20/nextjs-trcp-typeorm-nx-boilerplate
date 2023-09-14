import { connectRedis } from '@sprindt/database';

import { env } from '../../../../env.mjs';

export const redis = connectRedis({
  db: parseInt(env.REDIS_DATABASE, 10),
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT, 10),
  password: env.REDIS_PASSWORD,
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
