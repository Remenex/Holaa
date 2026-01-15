import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { ReactionsService } from '../services/reactions.service';

@UseGuards(JwtAuthGuard)
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  async react(
    @Req() req,
    @Body()
    body: {
      movieId: string;
      type: 'LIKE' | 'DISLIKE';
    },
  ) {
    return this.reactionsService.react(req.user.sub, body.movieId, body.type);
  }

  @Delete(':movieId')
  async removeReaction(@Req() req, @Param('movieId') movieId: string) {
    return this.reactionsService.removeReaction(req.user.sub, movieId);
  }

  @Get('user')
  async getUserReactions(@Req() req) {
    return this.reactionsService.getUserReactions(req.user.sub);
  }

  @Get('user/movie/:movieId')
  getUserReactionForMovie(@Req() req, @Param('movieId') movieId: string) {
    return this.reactionsService.getUserReactionForMovie(req.user.sub, movieId);
  }

  @Get('/similar-taste/movies')
  getUsersWithSimilarTaste(@Req() req) {
    return this.reactionsService.getUsersWithSimilarTaste(req.user.sub);
  }
}
