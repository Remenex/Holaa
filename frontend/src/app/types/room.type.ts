export type Room = {
  _id: string;
  movieId: string;
  hostId: string;
};

export type CreateRoom = {
  movieId: string;
  hostId: string;
};
