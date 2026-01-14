import { Movie } from 'src/movies/entities/movie.entity';

export type ReactionType = 'LIKE' | 'DISLIKE';

export type Reaction = {
  movie: Movie;
  type: ReactionType;
  createdAt: string;
};
