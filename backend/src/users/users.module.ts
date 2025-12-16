import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UsersService } from './services/users.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
