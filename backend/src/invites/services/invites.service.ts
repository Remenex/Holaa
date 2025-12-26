import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInvite } from '../dtos/invite';
import { Invite } from '../entities/invite.entity';
import { InvitesGateway } from '../invites.gateway';

export class InvitesService {
  constructor(
    @InjectModel(Invite.name)
    private inviteModel: Model<Invite>,

    private readonly invitesGateway: InvitesGateway,
  ) {}

  async create(inviteData: CreateInvite) {
    const invite = (await this.inviteModel.create(inviteData)).toObject();

    this.invitesGateway.sendInvite(inviteData.toUserId, {
      inviteId: invite._id,
      fromUserId: inviteData.fromUserId,
      roomId: inviteData.roomId,
    });

    return invite;
  }
}
