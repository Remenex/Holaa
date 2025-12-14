import { Module } from '@nestjs/common';
import { UserRepository } from 'src/users/repository/user.repository';
import { MovieController } from './controllers/movie.controller';
import { MovieRepository } from './repository/movie.repository';
import { MovieService } from './services/movie.service';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, UserRepository],
  exports: [MovieService, MovieRepository, UserRepository],
})
export class MovieModule {}
