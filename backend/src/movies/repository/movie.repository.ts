import { Injectable, OnModuleInit } from '@nestjs/common';

import { UserRepository } from 'src/users/repository/user.repository';

@Injectable()
export class MovieRepository implements OnModuleInit {
  constructor(private userRepository: UserRepository) {}

  onModuleInit() {}

  // getMovies(filter?: {
  //   title?: string;
  //   category?: string;
  // }): Observable<Movie[]> {
  //   let query = 'SELECT * FROM movies';
  //   const conditions: string[] = [];
  //   const params: any[] = [];

  //   if (filter?.category) {
  //     conditions.push('category = ?');
  //     params.push(filter.category);
  //   }

  //   if (filter?.title) {
  //     conditions.push('title = ?');
  //     params.push(filter.title);
  //   }

  //   if (conditions.length > 0) {
  //     query += ' WHERE ' + conditions.join(' AND ');
  //   }

  //   return from(this.cassandraService.executeQuery(query, params)).pipe(
  //     map((result) => {
  //       return result.rows.map((row) => ({
  //         movieId: row.get('movie_id'),
  //         category: row.get('category'),
  //         creationDate: row.get('creation_date'),
  //         description: row.get('description'),
  //         mainCharacterImage: row.get('main_character_image'),
  //         ownerId: row.get('owner_id'),
  //         thumbnail: row.get('thumbnail'),
  //         title: row.get('title'),
  //         trailer: row.get('trailer'),
  //         video: row.get('video'),
  //       }));
  //     }),
  //   );
  // }

  // getMovieById(movieId: UUID): Observable<Movie | null> {
  //   return from(this.movieMapper.get({ movie_id: movieId })).pipe(
  //     map((movie) => (movie ? movie : null)),
  //     catchError((error) => {
  //       console.error(
  //         `Greška pri dohvaćanju filma sa ID-jem ${movieId}:`,
  //         error,
  //       );
  //       return of(null);
  //     }),
  //   );
  // }

  // createMovie(movieData: CreateMovie): Observable<CreateMovie> {
  //   const user_id =
  //     movieData.owner_id as `${string}-${string}-${string}-${string}-${string}`;
  //   return from(this.userRepository.getUser(user_id)).pipe(
  //     switchMap((user) => {
  //       if (!user) {
  //         throw new Error(`Korisnik sa ID-jem ${user_id} ne postoji!`);
  //       }
  //       if (!user.is_admin) {
  //         throw new Error(`Korisnik sa ID-jem ${user_id} nije admin`);
  //       }

  //       const newMovie: CreateMovie = {
  //         id: uuidv4() as `${string}-${string}-${string}-${string}-${string}`,
  //         creation_date: new Date(),
  //         ...movieData,
  //       };

  //       return from(this.movieMapper.insert(newMovie)).pipe(
  //         map((result) => {
  //           if (result.wasApplied()) {
  //             return newMovie;
  //           }
  //           throw new Error('Dodavanje filma nije primenjeno!');
  //         }),
  //         catchError((error) => {
  //           console.log('Doslo je do greske prilikom dodavanja filma: ', error);
  //           return of(null);
  //         }),
  //       );
  //     }),
  //     catchError((error) => {
  //       console.log('Provera korisnika nije uspela: ', error);
  //       return of(null);
  //     }),
  //   );
  // }
}
