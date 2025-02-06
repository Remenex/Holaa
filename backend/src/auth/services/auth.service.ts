import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { CreateUser } from 'src/users/dtos/user';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(username: string, password: string): Observable<any> {
    return from(this.usersService.findOne(username)).pipe(
      switchMap((user) => {
        if (!user) {
          return throwError(
            () =>
              new NotFoundException(
                'Korisnik sa unetom email adresom ne postoji',
              ),
          );
        }
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isPasswordValid) => {
            if (isPasswordValid) return user;
            return null;
          }),
        );
      }),
    );
  }

  login(user: any): Observable<string> {
    if (user) {
      const payload = { username: user.username, sub: user.userId };
      const token = this.jwtService.sign(payload);
      return of(token);
    }
    return throwError(
      () => new NotFoundException('Ne mozemo pronaci korisnika'),
    );
  }

  register(userData: CreateUser): Observable<string> {
    return from(this.usersService.findOne(userData.email)).pipe(
      switchMap((user) => {
        if (user) {
          return throwError(
            () =>
              new ConflictException(
                'Korisnik sa ovom email adresom vec postoji!',
              ),
          );
        }
        return from(bcrypt.hash(userData.password, 10)).pipe(
          switchMap((hashedPassword) => {
            const newUser = { ...userData };
            newUser.password = hashedPassword;
            return from(this.usersService.createOne(newUser)).pipe(
              map((savedUser) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...userData } = savedUser;
                return this.jwtService.sign(userData);
              }),
            );
          }),
        );
      }),
    );
  }
}
