import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { Movie } from './movie.model';

@Injectable()
export class MovieRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  movieMapper: mapping.ModelMapper<Movie>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        Movie: {
          tables: ['movies'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };
    this.movieMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('Movie');
  }

  async getMovies() {
    return (await this.movieMapper.findAll()).toArray();
  }
}
