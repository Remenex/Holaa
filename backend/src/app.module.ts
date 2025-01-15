import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraService } from './cassandra/cassandra.service';
import { CassandraModule } from './cassandra/cassandra.module';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [CassandraModule, MovieModule],
  controllers: [AppController, MovieController],
  providers: [AppService, CassandraService, MovieService],
})
export class AppModule {}
