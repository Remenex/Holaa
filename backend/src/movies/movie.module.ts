import { Module } from '@nestjs/common';
import { CassandraModule } from 'src/cassandra/cassandra.module';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from './services/movie.service';
import { MovieRepository } from './repository/movie.repository';
import { UserRepository } from 'src/users/repository/user.repository';

@Module({
  imports: [CassandraModule],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository, UserRepository],
  exports: [MovieService, MovieRepository, UserRepository],
})
export class MovieModule {}
