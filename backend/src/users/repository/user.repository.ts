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
    return from(this.userMapper.find({ email })).pipe(
      map((result) => {
        return result.first();
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
