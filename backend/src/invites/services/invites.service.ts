import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { CreateInvite } from '../dtos/invite';
import { Invite } from '../entities/invite.entity';
import { InvitesGateway } from '../invites.gateway';

export class InvitesService {
  constructor(
    @InjectModel(Invite.name)
    private inviteModel: Model<Invite>,

    private readonly invitesGateway: InvitesGateway,

    private readonly userService: UsersService,
  ) {}

  async findUserInvites(id: string) {
    return this.inviteModel
      .find({ toUserId: id })
      .populate({
        path: 'fromUserId',
        select: '-password -__v',
      })
      .lean();
  }

  async create(inviteData: CreateInvite) {
    const invite = (await this.inviteModel.create(inviteData)).toObject();

    const user = await this.userService.findById(inviteData.fromUserId);

    this.invitesGateway.sendInvite(inviteData.toUserId, {
      invite: invite,
      fromUserId: user,
      roomId: inviteData.roomId,
    });

    return invite;
  }
}
