import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { AuthLoginDto } from '../dtos/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthLoginDto) {
    // const user = await this.usersService.findByEmail(username);
    // if (!user) throw new NotFoundException('User not found');
    // else if (!(await bcrypt.compare(password, user.password))) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
  // login(user: any): Observable<string> {
  //   if (user) {
  //     const payload = { username: user.username, sub: user.userId };
  //     const token = this.jwtService.sign(payload);
  //     return of(token);
  //   }
  //   return throwError(
  //     () => new NotFoundException('Ne mozemo pronaci korisnika'),
  //   );
  // }

  // register(userData: CreateUser): Observable<string> {
  //   return from(this.usersService.findOne(userData.email)).pipe(
  //     switchMap((user) => {
  //       if (user) {
  //         return throwError(
  //           () =>
  //             new ConflictException(
  //               'Korisnik sa ovom email adresom vec postoji!',
  //             ),
  //         );
  //       }
  //       return from(bcrypt.hash(userData.password, 10)).pipe(
  //         switchMap((hashedPassword) => {
  //           const newUser = { ...userData };
  //           newUser.password = hashedPassword;
  //           return from(this.usersService.createOne(newUser)).pipe(
  //             map((savedUser) => {
  //               // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //               const { password, ...userData } = savedUser;
  //               return this.jwtService.sign(userData);
  //             }),
  //           );
  //         }),
  //       );
  //     }),
  //   );
  // }
}
