import { Inject } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import Redis from 'ioredis';

import { Server, Socket } from 'socket.io';
import { Message } from 'src/messages/entities/message.entity';
import { PubSubService } from 'src/redis/service/pub-sub-service';
import { RoomsService } from './services/room.service';

@WebSocketGateway(8001, { namespace: '/rooms', cors: '*' })
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  @Inject('RedisClient') private readonly redis: Redis;
  constructor(
    private readonly roomsService: RoomsService,
    private readonly redisPubSub: PubSubService,
  ) {}

  onModuleInit() {
    this.redisPubSub.subscribe('room:message', (payload) => {
      const message = payload.message as Message;

      this.server.to(message.roomId).emit('room:new-message', message);
    });
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;
    const roomId = await this.redis.get(`user:${userId}:room`);
    client.join(roomId);
    console.log('Connected', userId);
  }

  @SubscribeMessage('room:join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId }: { roomId: string },
  ) {
    const userId = client.handshake.auth.userId;

    await this.redis.sadd(`room:${roomId}:users`, userId);
    await this.redis.set(`user:${userId}:room`, roomId);
    const users = await this.roomsService.findRoomMembers(roomId);

    client.join(roomId);
    this.server.to(roomId).emit('room:users', users);
  }

  @SubscribeMessage('room:exit')
  async handleExit(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.auth.userId;
    const roomId = await this.redis.get(`user:${userId}:room`);

    if (!userId || !roomId) return;

    await this.redis.srem(`room:${roomId}:users`, userId);
    await this.redis.del(`user:${userId}:room`);

    const users = await this.roomsService.findRoomMembers(roomId);

    this.server.to(roomId).emit('room:users', users);
    if (users.length === 0) {
      this.roomsService.delete(roomId);
    }
  }

  @SubscribeMessage('room:play')
  async handlePlay(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.auth.userId;
    const roomId = await this.redis.get(`user:${userId}:room`);
    client.broadcast.to(roomId).emit('room:play');
  }

  @SubscribeMessage('room:pause')
  async handleStop(@ConnectedSocket() client: Socket) {
    const userId = client.handshake.auth.userId;
    const roomId = await this.redis.get(`user:${userId}:room`);

    client.broadcast.to(roomId).emit('room:pause');
  }

  handleDisconnect(client: Socket) {
    console.log('ode');
  }
}
