export type Invite = {
  _id: string;
  roomId: string;
  fromUserId: User;
  toUserId: string;
  status: InviteStatus;
};

export enum InviteStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
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
