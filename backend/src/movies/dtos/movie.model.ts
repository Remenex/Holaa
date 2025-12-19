import { ObjectId } from 'mongoose';

export interface Movie {
  _id: ObjectId;
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
  _id: ObjectId;
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
