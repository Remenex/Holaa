import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { CreateUser, User } from '../dtos/user';
import { catchError, from, map, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

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
        console.log('Pronassao sam usera:', user);
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
}
