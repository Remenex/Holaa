import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateMovie, Movie } from '../dtos/movie.model';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from 'src/users/repository/user.repository';

@Injectable()
export class MovieRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private userRepository: UserRepository,
  ) {}

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

  createMovie(movieData: CreateMovie): Observable<CreateMovie> {
    const user_id =
      movieData.owner_id as `${string}-${string}-${string}-${string}-${string}`;
    return from(this.userRepository.getUser(user_id)).pipe(
      switchMap((user) => {
        if (!user) {
          throw new Error(`Korisnik sa ID-jem ${user_id} ne postoji!`);
        }
        if (!user.is_admin) {
          throw new Error(`Korisnik sa ID-jem ${user_id} nije admin`);
        }

        const newMovie: CreateMovie = {
          id: uuidv4() as `${string}-${string}-${string}-${string}-${string}`,
          creation_date: new Date(),
          ...movieData,
        };

        return from(this.movieMapper.insert(newMovie)).pipe(
          map((result) => {
            if (result.wasApplied()) {
              return newMovie;
            }
            throw new Error('Dodavanje filma nije primenjeno!');
          }),
          catchError((error) => {
            console.log('Doslo je do greske prilikom dodavanja filma: ', error);
            return of(null);
          }),
        );
      }),
      catchError((error) => {
        console.log('Provera korisnika nije uspela: ', error);
        return of(null);
      }),
    );
  }
}
