import { UUID } from 'crypto';

export interface Movie {
  id: UUID;
  title: string;
  imdb_rate: number;
}

export interface CreateMovie {
  id?: UUID;
  category: string;
  creation_date?: Date;
  description: string;
  main_character_image?: string;
  owner_id: string;
  thumbnail?: string;
  title: string;
  trailer?: string;
  video?: string;
}
