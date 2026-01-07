import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitesModule } from 'src/invites/invites.module';
import { RedisModule } from 'src/redis/redis.module';
import { UsersModule } from 'src/users/users.module';
import { RoomsController } from './controllers/rooms.controller';
import { Room, RoomSchema } from './enitites/room.entity';
import { RoomsGateway } from './rooms.gateway';
import { RoomsService } from './services/room.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
    RedisModule,
    UsersModule,
    InvitesModule,
  ],
  providers: [RoomsService, RoomsGateway],
  controllers: [RoomsController],
})
export class RoomsModule {}
