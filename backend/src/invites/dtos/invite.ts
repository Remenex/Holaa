import { ObjectId } from 'mongoose';

export enum InviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export type CreateInvite = {
  roomId: string;
  fromUserId?: string;
  toUserId: string;
  status: InviteStatus;
};

export type InviteReceived = {
  inviteId: ObjectId;
  fromUserId: string;
  roomId: string;
};
