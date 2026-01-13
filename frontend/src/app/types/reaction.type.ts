type ReactionType = "LIKE" | "DISLIKE";

type Reaction = {
  movie: Movie;
  type: ReactionType;
  updatedAt: string;
};
