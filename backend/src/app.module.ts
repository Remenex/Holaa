import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraService } from './cassandra/cassandra.service';
import { CassandraModule } from './cassandra/cassandra.module';
import { MovieController } from './movie/controllers/movie.controller';
import { MovieService } from './movie/services/movie.service';
import { MovieModule } from './movie/movie.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controllers/users.controller';
@Module({
  imports: [CassandraModule, MovieModule, AuthModule, UsersModule],
  controllers: [AppController, MovieController, UsersController],
  providers: [AppService, CassandraService, MovieService],
})
export class AppModule {}
