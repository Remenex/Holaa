import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body,
  Delete,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateMovie, UpdateMovie } from '../dtos/movie';
import { MovieService } from '../services/movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('')
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

  @Get('latest')
  async getLatestMovies() {
    return this.movieService.getLatestMovies();
  }

  @Get('top-rated')
  async getTopRatedMovies() {
    return this.movieService.getTopRatedMovies();
  }
}
