export type Room = {
  _id: string;
  movieId: string;
  creatorId: string;
};

export type CreateRoom = {
  movieId: string;
  creatorId?: string;
};
