import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { FriendshipsService } from '../services/friendships.service';

@Controller('friendships')
export class FriendshipsController {
  constructor(private readonly friendsService: FriendshipsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add/:id')
  async addFriend(@Req() req, @Param('id') friendId: string) {
    const userId = req.user.id;
    return this.friendsService.addFriend(userId, friendId);
  }
}
