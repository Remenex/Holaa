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

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/creator')
  getRoomByCreator(@Request() req) {
    return this.roomsService.findByCreator(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/members/:id')
  getRoomMembers(@Param('id') id: string) {
    return this.roomsService.findRoomMembers(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createRoom(@Request() req, @Body() roomData: CreateRoom) {
    roomData.creatorId = req.user.sub;

    return this.roomsService.create(roomData);
  }
}
