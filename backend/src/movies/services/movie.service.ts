import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from '../entities/movie.entity';
import { Model, Types } from 'mongoose';
import { CreateMovie, UpdateMovie } from '../dtos/movie';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<Movie>,
  ) {}

  async create(movieData: CreateMovie, files: any) {
    const movie = new this.movieModel({
      ...movieData,
      thumbnail: files?.thumbnail?.[0]
        ? `/uploads/movies/images/${files.thumbnail[0].filename}`
        : null,

      mainCharacterImage: files?.mainCharacterImage?.[0]
        ? `/uploads/movies/images/${files.mainCharacterImage[0].filename}`
        : null,

      video: files?.video?.[0]
        ? `/uploads/movies/videos/${files.video[0].filename}`
        : null,

      trailer: files?.trailer?.[0]
        ? `/uploads/movies/videos/${files.trailer[0].filename}`
        : null,
    });

    return movie.save();
  }

  async deleteMovie(id: string) {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException('Movie not found');

    const files = [
      movie.thumbnail,
      movie.mainCharacterImage,
      movie.video,
      movie.trailer,
    ];

    files.forEach((filePath) => {
      if (filePath) {
        const absolutePath = path.join(process.cwd(), filePath);
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
        }
      }
    });

    await this.movieModel.findByIdAndDelete(id);

    return { message: 'Movie and all related files deleted successfully' };
  }

  async updateMovie(id: string, data: UpdateMovie, files: any) {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException('Movie not found');

    if (data.title) movie.title = data.title;
    if (data.category) {
      movie.categories = data.category.map((id) => new Types.ObjectId(id));
    }
    if (data.description) movie.description = data.description;

    const fileFields = [
      'thumbnail',
      'mainCharacterImage',
      'video',
      'trailer',
    ] as const;

    fileFields.forEach((field) => {
      if (files?.[field]?.[0]) {
        if (movie[field]) {
          const oldPath = path.join(process.cwd(), movie[field]);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
        const folder =
          field === 'video' || field === 'trailer' ? 'videos' : 'images';
        movie[field] = `/uploads/movies/${folder}/${files[field][0].filename}`;
      }
    });

    await movie.save();
    return movie;
  }

  async getLatestMovies(limit = 10) {
    return this.movieModel
      .find()
      .populate('categories', 'name')
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async getTopRatedMovies(limit = 10) {
    return this.movieModel
      .find()
      .sort({ imdb: -1 })
      .limit(limit)
      .populate('categories', 'name')
      .exec();
  }
}
