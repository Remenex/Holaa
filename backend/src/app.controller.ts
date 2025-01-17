import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/services/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';
import { catchError, firstValueFrom, from, map, Observable, of } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    const token = await firstValueFrom(this.authService.login(req.user));
    return { access_token: token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/register')
  register(
    @Body() { username, password }: { username: string; password: string },
  ): Observable<{ success: boolean; message: string }> {
    return from(this.authService.register(username, password)).pipe(
      map((result) => ({ success: true, message: result })),
      catchError((error) => of({ success: false, message: error })),
    );
  }
}
