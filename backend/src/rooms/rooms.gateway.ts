import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import Redis from 'ioredis';

import { Server, Socket } from 'socket.io';

@WebSocketGateway(8001, { namespace: '/rooms', cors: '*' })
export class RoomsGateway implements OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  @Inject('RedisClient') private readonly redis: Redis;

  @SubscribeMessage('room:join')
  async handleJoin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId, userId }: { roomId: string; userId: string },
  ) {
    await this.redis.sadd(`room:${roomId}:users`, userId);
    await this.redis.set(`socket:${socket.id}`, userId);
    await this.redis.set(`socket:${socket.id}:room`, roomId);

    const users = await this.redis.smembers(`room:${roomId}:users`);

    this.server.to(roomId).emit('room:users', users);
    socket.join(roomId);
  }

  async handleDisconnect(socket: Socket) {
    const userId = await this.redis.get(`socket:${socket.id}`);
    const roomId = await this.redis.get(`socket:${socket.id}:room`);

    if (!userId || !roomId) return;

    await this.redis.srem(`room:${roomId}:users`, userId);
    await this.redis.del(`socket:${socket.id}`);
    await this.redis.del(`socket:${socket.id}:room`);

    const users = await this.redis.smembers(`room:${roomId}:users`);

    this.server.to(roomId).emit('room:users', users);
  }
}
