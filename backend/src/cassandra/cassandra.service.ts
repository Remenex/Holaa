import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { auth, Client, mapping } from 'cassandra-driver';

@Injectable()
export class CassandraService implements OnModuleInit, OnModuleDestroy {
  private client: Client;
  private mapper: mapping.Mapper;

  constructor() {
    this.createClient();
  }

  createClient() {
    this.client = new Client({
      cloud: {
        secureConnectBundle: 'src/cassandra/config/secure-connect-holaadb.zip',
      },
      authProvider: new auth.PlainTextAuthProvider(
        'token',
        'AstraCS:GTtUwgmUMuDWNzWwPaZcrEJM:34908c4e1cb455cc698d67807fcc38861c062e8beb61b7323d2272ec3efdd0cc',
      ),
      keyspace: 'movies_space',
    });

    this.connect();
  }

  async onModuleInit() {
    await this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('✅ Connected to AstraDB (Cassandra)');
    } catch (error) {
      console.error('❌ Cassandra connection error:', error);
    }
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client === undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions);
  }

  async executeQuery(query: string, params: any[] = []) {
    return this.client.execute(query, params, { prepare: true });
  }

  async onModuleDestroy() {
    await this.client.shutdown();
  }

  getClient(): Client {
    return this.client;
  }
}
