import { Module } from '@nestjs/common';
import { redisClientFactory } from './redis.factory';
import { RedisRepository } from './redis.repository';
import { RedisController } from './redis.controller';

@Module({
  providers: [redisClientFactory, RedisRepository],
  exports: [redisClientFactory, RedisRepository],
  controllers: [RedisController],
})
export class RedisModule {}
