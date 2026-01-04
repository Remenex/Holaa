type Room = {
  _id: string;
  movieId: string;
  creatorId: string;
};

type CreateRoom = {
  movieId: string;
  creatorId?: string;
};
