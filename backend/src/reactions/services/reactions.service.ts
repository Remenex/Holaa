import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MovieService } from 'src/movies/services/movie.service';
import { Neo4jService } from 'src/neo4j/services/neo4j.service';
import { UsersService } from 'src/users/services/users.service';
import { Reaction } from '../dtos/reaction';

type ReactionType = 'LIKE' | 'DISLIKE';

@Injectable()
export class ReactionsService {
  constructor(
    private readonly neo4j: Neo4jService,
    private readonly usersService: UsersService,
    private readonly moviesService: MovieService,
  ) {}

  async react(userId: string, movieId: string, type: ReactionType) {
    if (!['LIKE', 'DISLIKE'].includes(type)) {
      throw new BadRequestException('Nevalidna reakcija');
    }

    const user = await this.usersService.findById(userId);
    const movie = await this.moviesService.getMovieById(movieId);

    if (!user || !movie) {
      throw new NotFoundException('User ili film ne postoji');
    }

    const query = `
      MERGE (u:User {id: $userId})
      MERGE (m:Movie {id: $movieId})
      MERGE (u)-[r:REACTED]->(m)
      SET r.type = $type,
          r.createdAt = datetime()
    `;

    return await this.neo4j.run(query, { userId, movieId, type });
  }

  async removeReaction(userId: string, movieId: string) {
    const query = `
    MATCH (u:User {id: $userId})-[r:REACTED]->(m:Movie {id: $movieId})
    DELETE r
  `;

    return await this.neo4j.run(query, { userId, movieId });
  }

  async getUserReactions(userId: string) {
    const query = `
      MATCH (u:User {id: $userId})-[r:REACTED]->(m:Movie)
      RETURN 
        m.id AS movieId,
        r.type AS type,
        r.createdAt AS createdAt
      ORDER BY r.createdAt DESC
    `;

    const result = await this.neo4j.run(query, { userId });

    const reactions = await Promise.all(
      result.map(async (record) => ({
        movie: await this.moviesService.getMovieById(record.get('movieId')),
        type: record.get('type'),
        createdAt: record.get('createdAt'),
      })),
    );

    return reactions;
  }

  async getUserReactionForMovie(userId: string, movieId: string) {
    const query = `
      MATCH (u:User {id: $userId})-[r:REACTED]->(m:Movie {id: $movieId})
      RETURN 
        r.type AS type,
        r.createdAt AS createdAt
      LIMIT 1
    `;

    const movie = await this.moviesService.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundException('Film ne postoji');
    }
    const result = await this.neo4j.run(query, { userId, movieId });

    if (result.length === 0) {
      return 'empty';
    }

    const record = result[0];

    return {
      movie: movie,
      type: record.get('type'),
      createdAt: record.get('createdAt'),
    } as Reaction;
  }

  async getUsersWithSimilarTaste(userId: string) {
    const query = `
      MATCH (me:User {id: $userId})-[r1:REACTED {type: 'LIKE'}]->(m:Movie)
      MATCH (other:User)-[r2:REACTED {type: 'LIKE'}]->(m)
      WHERE other.id <> $userId
      RETURN 
        other.id AS userId,
        count(m) AS commonLikes
      ORDER BY commonLikes DESC
      LIMIT 10
    `;

    const result = await this.neo4j.run(query, { userId });

    const users = await Promise.all(
      result.map(async (record) => {
        return await this.usersService.findById(record.get('userId'));
      }),
    );

    return users;
  }
}
