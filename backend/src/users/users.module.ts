import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repository/user.repository';
import { UsersService } from './services/users.service';
@Module({
  imports: [],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
