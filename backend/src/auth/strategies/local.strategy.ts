import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // async validate(username: string, password: string): Promise<any> {
  //   try {
  //     const user = await firstValueFrom(
  //       this.authService.validateUser(username, password),
  //     );
  //     if (!user) {
  //       throw new UnauthorizedException('Invalid credentials');
  //     }
  //     return user;
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     throw new UnauthorizedException('Error during validation');
  //   }
  // }
}
