export type ReactionType = 'LIKE' | 'DISLIKE';

export type Reaction = {
  movieId: string;
  type: ReactionType;
  updatedAt: string;
};
