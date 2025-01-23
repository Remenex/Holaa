import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../repository/movie.repository';
import { Observable } from 'rxjs';
import { Movie } from '../dtos/movie.model';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  getMovies(): Observable<Movie[]> {
    return this.movieRepository.getMovies();
  }
}
