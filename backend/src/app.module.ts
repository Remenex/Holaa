import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MovieController } from './movies/controllers/movie.controller';
import { MovieModule } from './movies/movie.module';
import { MovieService } from './movies/services/movie.service';
import { UsersController } from './users/controllers/users.controller';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MovieModule,
    AuthModule,
    UsersModule,
    MulterModule.register({
      dest: './uploads',
    }),
    RedisModule,
    RoomsModule,
  ],
  controllers: [AppController, MovieController, UsersController],
  providers: [AppService, MovieService],
})
export class AppModule {}
