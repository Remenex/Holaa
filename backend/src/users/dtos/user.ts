import { UUID } from 'crypto';

export type MainUserInfo = {
  userId: number;
  username: string;
  password: string;
};

export interface User {
  user_id: UUID;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  image: string;
  creation_date: Date;
  is_admin: boolean;
}
