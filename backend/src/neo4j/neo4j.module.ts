import { Global, Module } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';

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
  ],
  exports: ['NEO4J_DRIVER'],
})
export class Neo4jModule {}
