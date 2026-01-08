import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class PubSubService implements OnModuleInit {
  constructor(
    @Inject('RedisClient') private readonly pub: Redis, // za publish
    @Inject('RedisSubscriber') private readonly sub: Redis, // za subscribe
  ) {}

  onModuleInit() {
    this.sub.on('error', (err) => console.error('[Redis SUB] error:', err));
    this.pub.on('error', (err) => console.error('[Redis PUB] error:', err));
  }

  async publish(channel: string, payload: any) {
    await this.pub.publish(channel, JSON.stringify(payload));
  }

  subscribe(channel: string, cb: (data: any) => void) {
    this.sub.subscribe(channel);

    this.sub.on('message', (ch, message) => {
      if (ch === channel) {
        cb(JSON.parse(message));
      }
    });
  }
}
