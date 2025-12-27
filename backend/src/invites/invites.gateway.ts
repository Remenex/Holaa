import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { InviteReceived } from './dtos/invite';

@WebSocketGateway(8001, { namespace: '/invites', cors: '*' })
export class InvitesGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;
    client.join(`user:${userId}`);
    console.log('User connected:', userId);
  }

  sendInvite(toUserId: string, payload: InviteReceived) {
    this.server.to(`user:${toUserId}`).emit(`invite:received`, payload);
  }
}
