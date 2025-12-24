import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUser } from 'src/users/dtos/user';
import { UsersService } from 'src/users/services/users.service';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const access_token = this.authService.login(req.user);
    console.log(access_token);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    return { message: 'Logged in' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.userService.findById(req.user.sub);
  }

  @Post('register')
  register(@Body() userData: CreateUser) {
    return this.userService.create(userData);
  }
}

// {
//   "email": "idjordje63@gmail.com",
//   "password": "djole2002",
//   "first_name": "Djordje",
//   "last_name": "Ivanovic",
//   "is_admin": false
// }
