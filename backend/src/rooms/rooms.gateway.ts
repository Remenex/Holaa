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
import { RoomsService } from './services/room.service';

@WebSocketGateway(8001, { namespace: '/rooms', cors: '*' })
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  @Inject('RedisClient') private readonly redis: Redis;
  constructor(private readonly roomsService: RoomsService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;
    console.log('Watcher is connected:', userId);
  }

  @SubscribeMessage('room:join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId }: { roomId: string },
  ) {
    const userId = client.handshake.auth.userId;

    await this.redis.sadd(`room:${roomId}:users`, userId);
    await this.redis.set(`socket:${client.id}`, userId);
    await this.redis.set(`socket:${client.id}:room`, roomId);
    const users = await this.roomsService.findRoomMembers(roomId);

    client.join(roomId);
    this.server.to(roomId).emit('room:users', users);
  }

  @SubscribeMessage('room:exit')
  async handleExit(@ConnectedSocket() client: Socket) {
    const userId = await this.redis.get(`socket:${client.id}`);
    const roomId = await this.redis.get(`socket:${client.id}:room`);

    if (!userId || !roomId) return;

    await this.redis.srem(`room:${roomId}:users`, userId);
    await this.redis.del(`socket:${client.id}`);
    await this.redis.del(`socket:${client.id}:room`);

    const users = await this.roomsService.findRoomMembers(roomId);

    this.server.to(roomId).emit('room:users', users);
  }

  handleDisconnect(client: Socket) {
    console.log('ode');
  }
}
