import { Module } from '@nestjs/common';
import { RedisController } from './controllers/redis.controller';
import { redisClientFactory, redisSubscriberFactory } from './redis.factory';
import { PubSubService } from './service/pub-sub-service';

@Module({
  providers: [PubSubService, redisClientFactory, redisSubscriberFactory],
  exports: [PubSubService, redisClientFactory, redisSubscriberFactory],
  controllers: [RedisController],
})
export class RedisModule {}
