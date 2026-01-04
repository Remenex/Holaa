type Invite = {
  _id: string;
  roomId: string;
  fromUserId: User;
  toUserId: string;
  status: InviteStatus;
};

enum InviteStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
}
type CreateInvite = {
  roomId?: string;
  fromUserId?: string;
  toUserId: string;
  status: InviteStatus;
};

type InviteReceived = {
  invite: Invite;
  fromUserId: User;
  roomId: string;
};
