import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
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
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
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
