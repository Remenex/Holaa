import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Neo4jService } from 'src/neo4j/services/neo4j.service';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class FriendshipsService {
  constructor(
    private readonly neo4j: Neo4jService,
    private readonly usersService: UsersService,
  ) {}

  async addFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException('Ne možeš sebe dodati');
    }

    const user = await this.usersService.findById(userId);
    const friend = await this.usersService.findById(friendId);

    if (!user || !friend) {
      throw new NotFoundException('User ne postoji');
    }

    const query = `
      MERGE (u:User {id: $userId})
      MERGE (f:User {id: $friendId})
      MERGE (u)-[:FRIEND_WITH]->(f)
      MERGE (f)-[:FRIEND_WITH]->(u)
    `;

    const result = await this.neo4j.run(query, { userId, friendId });
    console.log(result);

    return true;
  }

  async getFriends(userId: string) {
    const query = `
    MATCH (u:User {id: $userId})-[:FRIEND_WITH]->(f)
    RETURN f
  `;

    const result = await this.neo4j.run(query, { userId });

    const friendNodes = result.map((r) => r.get('f'));
    const friendIds = friendNodes.map((node) => node.properties.id);

    const members = await Promise.all(
      friendIds.map((id) => this.usersService.getCachedUser(id)),
    );

    return members.filter(Boolean);
  }

  async deleteFriend(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new BadRequestException('Ne možeš obrisati sebe');
    }

    const user = await this.usersService.findById(userId);
    const friend = await this.usersService.findById(friendId);

    if (!user || !friend) {
      throw new NotFoundException('User ne postoji');
    }

    const query = `  
      MATCH (u:User {id: $userId})-[r:FRIEND_WITH]-(f:User {id: $friendId})
      DELETE r
    `;

    const result = await this.neo4j.run(query, { userId, friendId });

    return result;
  }
}
