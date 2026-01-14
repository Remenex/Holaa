import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { FriendshipsService } from '../services/friendships.service';

@UseGuards(JwtAuthGuard)
@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendsService: FriendshipsService) {}

  @Get('/user')
  getUserFriends(@Req() req) {
    return this.friendsService.getFriends(req.user.sub);
  }

  @Delete(':id')
  deleteFriendship(@Req() req, @Param('id') friendId: string) {
    return this.friendsService.deleteFriend(req.user.sub, friendId);
  }
}
