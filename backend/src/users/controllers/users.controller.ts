import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs';
import { User } from '../dtos/user';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/users')
  getUsers(): Observable<User[]> {
    return this.userService.getUsers();
  }
}
