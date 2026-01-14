import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CreateMovie, UpdateMovie } from '../dtos/movie';
import { MovieService } from '../services/movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('latest/:limit')
  getLatestMovies(@Param('limit') limit: number) {
    return this.movieService.getLatestMovies(limit);
  }

  @Get('abstract')
  async getAbstractMovies() {
    return this.movieService.getAbstractMovies();
  }

  @Get('top-rated')
  async getTopRatedMovies(@Query('limit') limit?: string) {
    const lim = limit ? parseInt(limit) : 10;
    return this.movieService.getTopRatedMovies(lim);
  }

  @UseGuards(JwtAuthGuard)
  @Get('friends/watched')
  getMoviesWatchedByFriends(@Req() req) {
    return this.movieService.getMoviesWatchedByFriends(req.user.sub);
  }

  @Get('by-category/:id')
  async getMoviesByCategory(@Param('id') id: string) {
    return this.movieService.getMoviesByCategory(id);
  }
  @Get(':id')
  getMovie(@Param('id') id: string) {
    return this.movieService.getMovieById(id);
  }

  @Get()
  async getAllMovies() {
    return this.movieService.getAllMovies();
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'mainCharacterImage', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'trailer', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            if (file.mimetype.startsWith('image')) {
              cb(null, 'uploads/movies/images');
            } else {
              cb(null, 'uploads/movies/videos');
            }
          },
          filename: (req, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${unique}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async create(@UploadedFiles() files: any, @Body() body: CreateMovie) {
    return this.movieService.create(body, files);
  }

  @UseGuards(JwtAuthGuard)
  @Post('watched/:id')
  async setWacthedMovie(@Req() req, @Param('id') movieId: string) {
    return this.movieService.setWatchedMovie(req.user.sub, movieId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('watched/user')
  async getWatchedMovies(@Req() req) {
    return this.movieService.getWatchedMovies(req.user.sub);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'mainCharacterImage', maxCount: 1 },
        { name: 'video', maxCount: 1 },
        { name: 'trailer', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            if (file.mimetype.startsWith('image')) {
              cb(null, 'uploads/movies/images');
            } else {
              cb(null, 'uploads/movies/videos');
            }
          },
          filename: (req, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${unique}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async updateMovie(
    @Param('id') id: string,
    @Body() body: UpdateMovie,
    @UploadedFiles() files: any,
  ) {
    return this.movieService.updateMovie(id, body, files);
  }
}
