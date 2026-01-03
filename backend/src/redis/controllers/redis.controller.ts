import { Controller, Get } from '@nestjs/common';

@Controller('redis')
export class RedisController {
  constructor() {}
  @Get()
  async test() {
    return 'test';
  }
}
