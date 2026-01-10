import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: 'RedisClient',
  useFactory: () => {
    return new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      connectTimeout: 10000,
      maxRetriesPerRequest: 3,
    });
  },
  inject: [],
};

export const redisSubscriberFactory: FactoryProvider<Redis> = {
  provide: 'RedisSubscriber',
  useFactory: () => {
    return new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      connectTimeout: 10000,
      maxRetriesPerRequest: 3,
    });
  },
  inject: [],
};
