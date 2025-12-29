import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoom } from '../dtos/room';
import { Room } from '../enitites/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<Room>,
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
}
