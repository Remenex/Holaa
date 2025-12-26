import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CreateInvite } from '../dtos/invite';
import { InvitesService } from '../services/invites.service';

@Controller('invites')
export class InvitesController {
  constructor(private inviteService: InvitesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createInvite(@Request() req, @Body() inviteData: CreateInvite) {
    inviteData.fromUserId = req.user.sub;

    return this.inviteService.create(inviteData);
  }
}
