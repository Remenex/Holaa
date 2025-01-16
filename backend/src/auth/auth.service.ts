import { Injectable } from '@nestjs/common';
import { from, Observable, of, switchMap } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  validateUser(username: string, pass: string): Observable<any> {
    return from(this.usersService.findOne(username)).pipe(
      switchMap((user) => {
        console.log('USER: ', user);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return of(result);
        }
        return of(null);
      }),
    );
  }
}
