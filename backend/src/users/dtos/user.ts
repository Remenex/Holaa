import { ObjectId } from 'mongoose';

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
  creation_date?: Date;
  role: string;
}

export interface CreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
  role: string;
}
export interface UpdateUser {
  firstName: string;
  lastName: string;
}

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}
