import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { UserRepository } from './repository/user.repository';
@Module({
  imports: [CassandraModule],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
