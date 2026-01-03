import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import Redis from 'ioredis';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './socket-io/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ORIGIN,
    credentials: true,
  });

  app.use(cookieParser());

  const redisClient = app.get<Redis>('RedisClient');
  const redisSubClient = redisClient.duplicate();

  app.useWebSocketAdapter(new RedisIoAdapter(redisClient, redisSubClient));

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
