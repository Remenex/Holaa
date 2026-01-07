import { User } from 'src/users/entities/user.entity';
import { Invite } from '../entities/invite.entity';

export enum InviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export type CreateInvite = {
  roomId?: string;
  fromUserId?: string;
  toUserId: string;
  status: InviteStatus;
};

export type InviteReceived = {
  invite: Invite;
  fromUserId: User;
  roomId: string;
};
