import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  async getMovies() {
    return this.movieRepository.getMovies();
  }
}
