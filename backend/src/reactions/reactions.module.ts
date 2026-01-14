import { Module } from '@nestjs/common';
import { MovieModule } from 'src/movies/movie.module';
import { UsersModule } from 'src/users/users.module';
import { ReactionsController } from './controllers/reactions.controller';
import { ReactionsService } from './services/reactions.service';

@Module({
  imports: [UsersModule, MovieModule],
  controllers: [ReactionsController],
  providers: [ReactionsService],
  exports: [ReactionsService],
})
export class ReactionsModule {}
