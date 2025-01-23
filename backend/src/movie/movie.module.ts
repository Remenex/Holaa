import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from './services/movie.service';
import { MovieRepository } from './repository/movie.repository';

@Module({
  imports: [CassandraModule],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  exports: [MovieService, MovieRepository],
})
export class MovieModule {}
