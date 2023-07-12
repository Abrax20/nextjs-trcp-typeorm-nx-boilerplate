import IORedis from 'ioredis';

type ConnectRedisType = {
  db: number;
  host: string;
  port: number;
  password: string;
  username?: string;
  tls?: {
    port: number;
    servername: string;
  };
};

export function connectRedis(config: ConnectRedisType) {
  return new IORedis({
    enableReadyCheck: false,
    maxRetriesPerRequest: null,

    ...config,
    /*
    ...(config.has('redis.certificateAuthority')
      ? {
          tls: {
            servername: config.get('redis.hostname'),
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            ca: config.get('redis.certificateAuthority'),
          },
        }
      : {}),
     */
  });
}
