import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CreateInvite, InviteStatus } from '../dtos/invite';
import { InvitesService } from '../services/invites.service';

@UseGuards(JwtAuthGuard)
@Controller('invites')
export class InvitesController {
  constructor(private inviteService: InvitesService) {}

  @Get(':userId')
  getUserInvites(@Param('userId') userId: string) {
    return this.inviteService.findUserInvites(userId);
  }

  @Post()
  createInvite(@Request() req, @Body() inviteData: CreateInvite) {
    inviteData.fromUserId = req.user.sub;

    return this.inviteService.create(inviteData);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') inviteId: string,
    @Body('status') status: InviteStatus,
  ) {
    return this.inviteService.respondToInvite(inviteId, status);
  }
}
