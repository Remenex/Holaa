import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   const token = await firstValueFrom(this.authService.login(req.user));
  //   return { access_token: token };
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Post('register')
  // register(
  //   @Body() userData: CreateUser,
  // ): Observable<{ success: boolean; message: string }> {
  //   return from(this.authService.register(userData)).pipe(
  //     map((result) => ({ success: true, message: result })),
  //     catchError((error) => of({ success: false, message: error })),
  //   );
  // }
}

// {
//   "email": "idjordje63@gmail.com",
//   "password": "djole2002",
//   "first_name": "Djordje",
//   "last_name": "Ivanovic",
//   "is_admin": false
// }
