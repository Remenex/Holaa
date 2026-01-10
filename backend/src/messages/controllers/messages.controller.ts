import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CreateMessage } from '../dtos/message';
import { MessagesService } from '../services/messages.service';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('room/:roomId')
  getAllRoomMessages(@Param('roomId') roomId: string) {
    return this.messagesService.getAllRoomMessages(roomId);
  }

  @Post()
  create(@Request() req, @Body() body: CreateMessage) {
    body.fromUserId = req.user.sub;
    return this.messagesService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('text') text: string) {
    return this.messagesService.update(id, text);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.messagesService.delete(id);
  }
}
