import { Module } from '@nestjs/common';
import { RedisController } from './controllers/redis.controller';
import { redisClientFactory } from './redis.factory';

@Module({
  providers: [redisClientFactory],
  exports: [redisClientFactory],
  controllers: [RedisController],
})
export class RedisModule {}
