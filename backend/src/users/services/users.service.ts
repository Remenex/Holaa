import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { MainUserInfo } from '../dtos/user';

@Injectable()
export class UsersService {
  private compareTwoUsers(a: MainUserInfo, b: MainUserInfo) {
    return b.userId - a.userId;
  }
  private users: MainUserInfo[] = [
    {
      userId: 1,
      username: 'idjordje63@gmail.com',
      password: '$2b$10$8BAtvbh9mfOtZ/6Dj00bge/wauXBhJ6ecvDVtHqVX7KAmCr9AUqza',
    },
    {
      userId: 2,
      username: 'jaleksa388@gmail.com',
      password: 'aleksa2002',
    },
  ];

  findOne(username: string): Observable<MainUserInfo | undefined> {
    return of(this.users.find((user) => user.username === username));
  }

  createOne(username: string, password: string) {
    const newIndex = this.users.sort(this.compareTwoUsers)[0].userId + 1;
    const newUser: MainUserInfo = {
      userId: newIndex,
      username: username,
      password: password,
    };
    this.users.push(newUser);
    return of(newUser);
  }
}
