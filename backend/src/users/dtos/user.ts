import { ObjectId } from 'mongoose';

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  image?: string;
  creation_date?: Date;
  role: string;
}

export interface CreateUser {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  image?: string;
  role: string;
}
export interface UpdateUser {
  first_name: string;
  last_name: string;
}

export interface UpdatePassword {
  old_password: string;
  new_password: string;
}
