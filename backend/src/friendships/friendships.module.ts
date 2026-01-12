import { Module } from '@nestjs/common';

import { Neo4jModule } from 'src/neo4j/neo4j.module';
import { UsersModule } from 'src/users/users.module';
import { FriendshipsController } from './controllers/friendships.controller';
import { FriendshipsService } from './services/friendships.service';

@Module({
  imports: [Neo4jModule, UsersModule],
  providers: [FriendshipsService],
  controllers: [FriendshipsController],
  exports: [FriendshipsService],
})
export class FriendshipsModule {}
