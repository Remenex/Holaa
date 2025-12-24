import { ObjectId } from 'mongoose';

export interface User {
  _id: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
}

export interface CreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
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
