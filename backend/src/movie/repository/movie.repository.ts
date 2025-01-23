import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { Movie } from '../dtos/movie.model';
import { from, map, Observable } from 'rxjs';

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

  getMovies(): Observable<Movie[]> {
    return from(this.movieMapper.findAll()).pipe(
      map((result) => result.toArray()),
    );
  }
}
