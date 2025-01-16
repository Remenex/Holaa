import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

export type User = {
  userID: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userID: 1,
      username: 'idjordje63@gmail.com',
      password: 'djole2002',
    },
    {
      userID: 2,
      username: 'jaleksa388@gmail.com',
      password: 'aleksa2002',
    },
  ];

  findOne(username: string): Observable<User | undefined> {
    return of(this.users.find((user) => user.username === username));
  }
}
