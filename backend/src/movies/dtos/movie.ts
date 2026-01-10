import { ObjectId } from 'mongoose';

export interface Movie {
  _id: ObjectId;
  categoryIds: string[];
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
  category: string[];
  description: string;
  title: string;
  imdb: number;
  duration: string;
}

export interface UpdateMovie {
  title?: string;
  category?: string[];
  description?: string;
  imdb?: number;
  duration?: string;
}
