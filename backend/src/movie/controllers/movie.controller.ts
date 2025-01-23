import { Controller, Get } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from '../dtos/movie.model';

@Controller('movie')
export class MovieController {
  constructor(private moviService: MovieService) {}

  @Get('/movies')
  getMovies(): Observable<Movie[]> {
    return this.moviService.getMovies();
  }
}
