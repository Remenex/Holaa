import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/users/repository/user.repository';
import { MovieController } from './controllers/movie.controller';
import { Movie, MovieSchema } from './entities/movie.entity';
import { MovieRepository } from './repository/movie.repository';
import { MovieService } from './services/movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, UserRepository],
  exports: [MovieService, MovieRepository, UserRepository],
})
export class MovieModule {}
