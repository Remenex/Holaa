import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraService } from './cassandra/cassandra.service';
import { CassandraModule } from './cassandra/cassandra.module';
import { MovieController } from './movies/controllers/movie.controller';
import { MovieService } from './movies/services/movie.service';
import { MovieModule } from './movies/movie.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controllers/users.controller';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    CassandraModule,
    MovieModule,
    AuthModule,
    UsersModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController, MovieController, UsersController],
  providers: [AppService, CassandraService, MovieService],
})
export class AppModule {}
