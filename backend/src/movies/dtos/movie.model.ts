import { UUID } from 'crypto';

export interface Movie {
  movieId: string;
  category: string;
  creationDate: string;
  description: string;
  mainCharacterImage: string;
  ownerId: string;
  thumbnail: string;
  title: string;
  trailer: string;
  video: string;
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
