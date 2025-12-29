import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsController } from './controllers/rooms/rooms.controller';
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
  ],
  providers: [RoomsService, RoomsGateway],
  controllers: [RoomsController],
})
export class RoomsModule {}
