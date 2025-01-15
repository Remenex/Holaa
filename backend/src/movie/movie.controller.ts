import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private moviService: MovieService) {}

  @Get('/movies')
  async getMovies() {
    return this.moviService.getMovies();
  }
}
