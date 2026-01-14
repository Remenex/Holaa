import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { InvitesModule } from './invites/invites.module';
import { MessagesModule } from './messages/messages.module';
import { MovieModule } from './movies/movie.module';
import { Neo4jModule } from './neo4j/neo4j.module';
import { RedisModule } from './redis/redis.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    MovieModule,
    AuthModule,
    UsersModule,
    MulterModule.register({
      dest: './uploads',
    }),
    RedisModule,
    RoomsModule,
    InvitesModule,
    MessagesModule,
    Neo4jModule,
    FriendshipsModule,
    ReactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
