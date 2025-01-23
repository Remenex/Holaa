import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping } from 'cassandra-driver';
import { CassandraService } from 'src/cassandra/cassandra.service';
import { User } from '../dtos/user';
import { from, map, Observable } from 'rxjs';

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
}
