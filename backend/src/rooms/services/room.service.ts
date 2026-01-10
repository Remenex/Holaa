import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Redis from 'ioredis';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { CreateRoom } from '../dtos/room';
import { Room } from '../enitites/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<Room>,

    @Inject('RedisClient') private readonly redis: Redis,

    private readonly userService: UsersService,
  ) {}

  async findById(id: string) {
    return await this.roomModel.findById(id).lean();
  }

  async findByCreator(creatorId: string) {
    const room = await this.roomModel.findOne({ creatorId }).lean();

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async create(roomData: CreateRoom) {
    return (await this.roomModel.create(roomData)).toObject();
  }

  async findRoomMembers(id: string) {
    const ids = await this.redis.smembers(`room:${id}:users`);

    const members = await Promise.all(
      ids.map((id) => this.userService.getCachedUser(id)),
    );

    return members.filter(Boolean);
  }
}
