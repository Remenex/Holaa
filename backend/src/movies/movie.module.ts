import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MovieController } from './controllers/movie.controller';
import { Movie, MovieSchema } from './entities/movie.entity';

import { CategoryModule } from 'src/categories/category.module';
import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { MovieService } from './services/movie.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
    CategoryModule,
    Neo4jModule,
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
