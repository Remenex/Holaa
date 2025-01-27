import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateUser, UpdateUser, User } from '../dtos/user';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
import { join } from 'path';
import { promises as fs } from 'fs';
@Injectable()
export class UserRepository implements OnModuleInit {
  constructor(private cassandraService: CassandraService) {}

  userMapper: mapping.ModelMapper<User>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        User: {
          tables: ['users'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };
    this.userMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('User');
  }

  getUsers(): Observable<User[]> {
    return from(this.userMapper.findAll()).pipe(
      map((result) => result.toArray()),
    );
  }

  findUser(email: string): Observable<User> {
    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    return from(this.cassandraService.executeQuery(query, [email])).pipe(
      map((result) => {
        if (result.rows.length === 0) {
          return null;
        }
        const row = result.rows[0];
        const user: User = {
          user_id: row.get('user_id'),
          email: row.get('email'),
          password: row.get('password'),
          first_name: row.get('first_name'),
          last_name: row.get('last_name'),
          image: row.get('image'),
          creation_date: row.get('creation_date'),
          is_admin: row.get('is_admin'),
        };
        return user;
      }),
      catchError((error) => {
        console.error('Greška prilikom pretrage korisnika:', error);
        return of(null);
      }),
    );
  }

  createOne(userData: CreateUser): Observable<User> {
    const newUser: User = {
      user_id: uuidv4() as `${string}-${string}-${string}-${string}-${string}`,
      image: '/',
      creation_date: new Date(),
      is_admin: false,
      ...userData,
    };
    return from(this.userMapper.insert(newUser)).pipe(map(() => newUser));
  }

  updateUser(uuid: UUID, userData: UpdateUser): Observable<boolean> {
    return from(this.userMapper.update({ user_id: uuid, ...userData })).pipe(
      map((result) => result.wasApplied()),
      catchError((error) => {
        console.log('Greska prilikom azuriranja korisnika', error);
        return of(false);
      }),
    );
  }

  getUserPasswordById(uuid: UUID): Promise<string> {
    const query = 'SELECT password FROM users WHERE user_id = ?';
    return this.cassandraService.executeQuery(query, [uuid]).then((result) => {
      if (result.rows.length === 0) return null;
      return result.rows[0].get('password');
    });
  }

  updatePassword(uuid: UUID, newPassword: string): Observable<boolean> {
    const query = 'UPDATE users SET password = ? WHERE user_id = ?';
    return from(
      this.cassandraService.executeQuery(query, [newPassword, uuid]),
    ).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  updateProfileImage(uuid: UUID, imagePath: string): Observable<boolean> {
    return from(this.userMapper.get({ user_id: uuid })).pipe(
      switchMap((user) => {
        if (user?.image) {
          const currentImagePath = join(__dirname, '../../../', user.image);
          return from(fs.access(currentImagePath)).pipe(
            switchMap(() => from(fs.unlink(currentImagePath))),
            catchError((error) => {
              console.log('Greska pri brisanju trenutne slike:', error);
              return of(null);
            }),
          );
        }
        return of(null);
      }),
      switchMap(() =>
        from(this.userMapper.update({ user_id: uuid, image: imagePath })).pipe(
          map((result) => result.wasApplied()),
          catchError((error) => {
            console.log('Greska prilikom promene profilne slike:', error);
            return of(false);
          }),
        ),
      ),
    );
  }

  deleteProfile(uuid: UUID): Observable<boolean> {
    return from(this.userMapper.get({ userId: uuid })).pipe(
      switchMap((user) => {
        if (user?.image && user?.image !== '/') {
          return from(fs.unlink(user.image)).pipe(
            map(() => user),
            catchError((error) => {
              console.log('Greska prilikom brisanja profilne slike: ', error);
              return of(user);
            }),
          );
        }
        return of(user);
      }),
      switchMap(() =>
        from(this.userMapper.remove({ userId: uuid })).pipe(
          map((result) => result.wasApplied()),
          catchError((error) => {
            console.log('Greska prilikom brisanja naloga: ', error);
            return of(false); // U slučaju greške vraćamo false
          }),
        ),
      ),
    );
  }
}
