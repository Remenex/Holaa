import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage, Express } from 'multer';
import { from, Observable } from 'rxjs';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateMovie, Movie } from '../dtos/movie.model';
import { MovieService } from '../services/movie.service';

@Controller('movie')
export class MovieController {
  constructor(
    private movieService: MovieService,
    private cassandraService: CassandraService,
  ) {}

  @Get('/movies')
  getMovies(): Observable<Movie[]> {
    return this.movieService.getMovies();
  }

  @Post('/addMovie')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'main_character_image', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'trailer', maxCount: 1 },
        { name: 'video', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/movies',
          filename: (req, file, cb) => {
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, `${uniqueSuffix}-${file.originalname}`);
          },
        }),
        fileFilter: (req, file, cb) => {
          const allowedMimeTypes = {
            main_character_image: /\/(jpg|jpeg|png)$/,
            thumbnail: /\/(jpg|jpeg|png)$/,
            trailer: /\/(mp4|mov)$/,
            video: /\/(mp4|mov)$/,
          };

          const fieldName = file.fieldname;
          if (!allowedMimeTypes[fieldName]?.test(file.mimetype)) {
            return cb(new Error(`Invalid file type for ${fieldName}`), false);
          }

          cb(null, true);
        },
      },
    ),
  )
  createMovie(
    @UploadedFiles()
    files: {
      main_character_image?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
      trailer?: Express.Multer.File[];
      video?: Express.Multer.File[];
    },
    @Body() data: CreateMovie,
  ): Observable<CreateMovie> {
    if (!files || Object.keys(files).length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const movieData: CreateMovie = {
      main_character_image: files.main_character_image?.[0]?.path || null,
      thumbnail: files.thumbnail?.[0]?.path || null,
      trailer: files.trailer?.[0]?.path || null,
      video: files.video?.[0]?.path || null,
      ...data,
    };

    return from(this.movieService.createMovie(movieData));
  }
}
