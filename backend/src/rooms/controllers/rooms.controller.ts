import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CreateRoom } from 'src/rooms/dtos/room';
import { RoomsService } from 'src/rooms/services/room.service';

@UseGuards(JwtAuthGuard)
@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Get('/creator')
  getRoomByCreator(@Request() req) {
    return this.roomsService.findByCreator(req.user.sub);
  }

  @Get('member/:roomId/:userId')
  async getIsRoomMember(
    @Param('roomId') roomId: string,
    @Param('userId') userId: string,
  ) {
    return this.roomsService.findRoomMember(roomId, userId);
  }

  @Get('/members/:id')
  getRoomMembers(@Param('id') id: string) {
    return this.roomsService.findRoomMembers(id);
  }

  @Get('/:id')
  getRoom(@Param('id') id: string) {
    return this.roomsService.findById(id);
  }

  @Post()
  createRoom(@Request() req, @Body() roomData: CreateRoom) {
    roomData.creatorId = req.user.sub;

    return this.roomsService.create(roomData);
  }
}
