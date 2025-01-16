import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, map, Observable, of } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, pass: string): Observable<any> {
    return from(this.usersService.findOne(username)).pipe(
      map((user) => {
        if (user && user.password === pass) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...result } = user;
          return result;
        }
        return null;
      }),
    );
  }

  login(user: any): Observable<string> {
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    return of(token);
  }
}
