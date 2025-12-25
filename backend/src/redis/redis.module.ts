import { Module } from '@nestjs/common';
import { RedisController } from './controllers/redis.controller';
import { redisClientFactory } from './redis.factory';
import { RedisRepository } from './redis.repository';

@Module({
  providers: [redisClientFactory, RedisRepository],
  exports: [redisClientFactory, RedisRepository],
  controllers: [RedisController],
})
export class RedisModule {}
