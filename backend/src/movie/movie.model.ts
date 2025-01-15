import { UUID } from 'crypto';

export interface Movie {
  id: UUID;
  title: string;
  imdb_rate: number;
}
