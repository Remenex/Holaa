import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { from, Observable } from 'rxjs';
import { CreateMovie, Movie } from '../dtos/movie.model';
import { MovieRepository } from '../repository/movie.repository';

@Injectable()
export class MovieService {
  constructor(private movieRepository: MovieRepository) {}

  getMovies(filters?: {
    title?: string;
    category?: string;
  }): Observable<Movie[]> {
    return from(this.movieRepository.getMovies(filters));
  }

  getMovie(id: UUID): Observable<Movie> {
    return from(this.movieRepository.getMovieById(id));
  }

  createMovie(movieData: CreateMovie): Observable<CreateMovie> {
    return from(this.movieRepository.createMovie(movieData));
  }
}
