import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MovieController } from './movies/controllers/movie.controller';
import { MovieModule } from './movies/movie.module';
import { MovieService } from './movies/services/movie.service';
import { UsersController } from './users/controllers/users.controller';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    MovieModule,
    AuthModule,
    UsersModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController, MovieController, UsersController],
  providers: [AppService, MovieService],
})
export class AppModule {}
