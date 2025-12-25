import { Controller, Get } from '@nestjs/common';
import { RedisRepository } from './redis.repository';

@Controller('redis')
export class RedisController {
  constructor(private readonly redis: RedisRepository) {}
  @Get()
  async test() {
    await this.redis.set('test', 'hello', 'world');
    return await this.redis.get('test', 'hello');
  }
}
