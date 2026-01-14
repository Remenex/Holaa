type ReactionType = "LIKE" | "DISLIKE";

type Reaction = {
  movie: Movie;
  type: ReactionType;
  createdAt: string;
};
