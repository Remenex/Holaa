import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../repository/movie.repository';
import { from, Observable } from 'rxjs';
import { CreateMovie, Movie } from '../dtos/movie.model';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  getMovies(): Observable<Movie[]> {
    return from(this.movieRepository.getMovies());
  }

  createMovie(movieData: CreateMovie): Observable<CreateMovie> {
    return from(this.movieRepository.createMovie(movieData));
  }
}
