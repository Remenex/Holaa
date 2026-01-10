type Message = {
  _id: string;
  fromUserId: User;
  roomId: string;
  text: string;
};

type CreateMessage = {
  fromUserId: string;
  roomId: string;
  text: string;
};
