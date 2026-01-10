import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { CreateInvite, InviteStatus } from '../dtos/invite';
import { Invite } from '../entities/invite.entity';
import { InvitesGateway } from '../invites.gateway';

@Injectable()
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
    const user = await this.userService.findById(inviteData.fromUserId);

    const invite = await this.inviteModel.findOneAndUpdate(
      {
        fromUserId: inviteData.fromUserId,
        toUserId: inviteData.toUserId,
        roomId: inviteData.roomId,
      },
      {
        $set: {
          status: inviteData.status,
          createdAt: new Date(),
        },
      },
      {
        new: true, // vrati updated dokument
        upsert: true, // ako ne postoji → napravi
      },
    );

    this.invitesGateway.sendInvite(inviteData.toUserId, {
      invite: invite,
      fromUserId: user,
      roomId: inviteData.roomId,
    });

    return invite;
  }

  async respondToInvite(inviteId: string, status: InviteStatus) {
    const invite = await this.inviteModel.findByIdAndUpdate(
      {
        _id: inviteId,
        status: InviteStatus.PENDING,
      },
      { status },
      { new: true },
    );

    if (!invite) {
      throw new Error('Invite not found or already handled');
    }

    return invite;
  }
}
