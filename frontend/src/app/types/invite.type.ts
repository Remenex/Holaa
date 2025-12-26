export enum InviteStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}

export type CreateInvite = {
  roomId: string;
  fromUserId?: string;
  toUserId: string;
  status: InviteStatus;
};

export type InviteReceived = {
  inviteId: string;
  fromUserId: string;
  roomId: string;
};
