import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model, Types } from 'mongoose';
import * as path from 'path';
import { Neo4jService } from 'src/neo4j/services/neo4j.service';
import { CreateMovie, UpdateMovie } from '../dtos/movie';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<Movie>,
    private readonly neo4j: Neo4jService,
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

  async getMovieById(id: string) {
    const movie = await this.movieModel.findById(id).lean();

    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async getAllMovies() {
    return this.movieModel.find().sort({ createdAt: -1 });
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

  async setWatchedMovie(userId: string, movieId: string) {
    const query = `
      MERGE (u:User {id: $userId})
      MERGE (m:Movie {id: $movieId})
      MERGE (u)-[w:WATCHED]->(m)
      SET w.createdAt = datetime()`;

    const movie = await this.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundException('Film ne postoji');
    }

    return await this.neo4j.run(query, { userId, movieId });
  }

  async getWatchedMovies(userId: string) {
    const query = `
    MATCH (u:User {id: $userId})-[w:WATCHED]->(m:Movie)
    RETURN m.id AS movieId, w.createdAt AS watchedAt
    ORDER BY w.createdAt DESC
  `;
    const result = await this.neo4j.run(query, { userId });

    const movieIds: string[] = result.map((record) => record.get('movieId'));

    if (movieIds.length === 0) return [];

    const objectIds: Types.ObjectId[] = movieIds.map(
      (id) => new Types.ObjectId(id),
    );

    const movies = await this.movieModel
      .find({
        _id: { $in: objectIds } as any,
      })
      .populate('categories', 'name')
      .lean();

    const moviesMap = new Map(movies.map((m) => [m._id.toString(), m]));
    const sortedMovies = movieIds
      .map((id) => moviesMap.get(id))
      .filter((m) => m !== undefined);

    return sortedMovies;
  }

  async getMoviesWatchedByFriends(userId: string) {
    const query = `
      MATCH (me:User {id: $userId})-[:FRIEND_WITH]->(friend:User)
      MATCH (friend)-[w:WATCHED]->(m:Movie)
      WHERE NOT (me)-[:WATCHED]->(m)
      RETURN DISTINCT m.id AS movieId, w.createdAt AS watchedAt
      ORDER BY w.createdAt DESC
      LIMIT 10
    `;

    const result = await this.neo4j.run(query, { userId });

    const movieIds: string[] = result.map((r) => r.get('movieId'));

    if (movieIds.length === 0) return [];

    const objectIds = movieIds.map((id) => new Types.ObjectId(id));

    const movies = await this.movieModel
      .find({ _id: { $in: objectIds } as any })
      .populate('categories', 'name')
      .lean();

    const movieMap = new Map(
      movies.map((movie) => [movie._id.toString(), movie]),
    );

    return movieIds.map((id) => movieMap.get(id)).filter(Boolean);
  }

  async getMoviesByCategory(categoryId: string) {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new NotFoundException('Invalid category ID');
    }

    const movies = await this.movieModel
      .find({ categories: new Types.ObjectId(categoryId) })
      .populate('categories', 'name')
      .sort({ createdAt: -1 })
      .exec();

    return movies;
  }

  async getAbstractMovies() {
    return this.movieModel.find({ abstract: true }).exec();
  }
}
