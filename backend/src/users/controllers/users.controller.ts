import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { from, Observable } from 'rxjs';
import { UpdatePassword, UpdateUser, User } from '../dtos/user';
import { UUID } from 'crypto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/users')
  getUsers(): Observable<User[]> {
    return this.userService.getUsers();
  }

  @Put('/update/:id')
  updateUser(
    @Param('id') id: UUID,
    @Body() userData: UpdateUser,
  ): Observable<{ success: boolean; message: string }> {
    return from(this.userService.updateUser(id, userData));
  }

  @Put('/changePassword/:id')
  changePassword(
    @Param('id') id: UUID,
    @Body() passwords: UpdatePassword,
  ): Observable<{ success: boolean; message: string }> {
    return from(this.userService.updatePassword(id, passwords));
  }
}
