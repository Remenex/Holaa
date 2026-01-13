type ReactionType = "LIKE" | "DISLIKE";

type Reaction = {
  movieId: string;
  type: ReactionType;
  updatedAt: string;
};
