import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUser, UpdatePassword } from '../dtos/user';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: Partial<CreateUser>) {
    return this.userService.updateUser(id, body);
  }

  @Patch(':id/password')
  async updatePassword(@Param('id') id: string, @Body() dto: UpdatePassword) {
    return this.userService.updatePassword(id, dto);
  }
}
