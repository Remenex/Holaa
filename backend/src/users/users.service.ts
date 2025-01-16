import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'idjordje63@gmail.com',
      password: 'djole2002',
    },
    {
      userId: 2,
      username: 'jaleksa388@gmail.com',
      password: 'aleksa2002',
    },
  ];

  findOne(username: string): Observable<User | undefined> {
    return of(this.users.find((user) => user.username === username));
  }
}
