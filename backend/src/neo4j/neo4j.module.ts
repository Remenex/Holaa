import { Global, Module } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';
import { Neo4jService } from './services/neo4j.service';

@Global()
@Module({
  providers: [
    {
      provide: 'NEO4J_DRIVER',
      useFactory: async (): Promise<Driver> => {
        return neo4j.driver(
          process.env.NEO4J_URI!,
          neo4j.auth.basic(
            process.env.NEO4J_USER!,
            process.env.NEO4J_PASSWORD!,
          ),
        );
      },
    },
    Neo4jService,
  ],
  exports: ['NEO4J_DRIVER', Neo4jService],
})
export class Neo4jModule {}
