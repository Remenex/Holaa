import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { CreateUser, MainUserInfo, User } from '../dtos/user';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  findOne(username: string): Observable<MainUserInfo | undefined> {
    return from(this.userRepository.findUser(username)).pipe(
      map((result) => {
        if (result) {
          const newMainUserInfo: MainUserInfo = {
            userId: result.user_id,
            username: result.email,
            password: result.password,
          };
          return newMainUserInfo;
        }
        return null;
      }),
    );
  }

  createOne(userData: CreateUser): Observable<User> {
    return this.userRepository.createOne(userData);
  }

  getUsers(): Observable<User[]> {
    return this.userRepository.getUsers();
  }
}
