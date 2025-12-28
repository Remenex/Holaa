import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoom } from '../dtos/room';
import { Room } from '../enitites/room.entity';

export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<Room>,
  ) {}

  async findById(id: string) {
    return await this.roomModel.findById(id).lean();
  }

  async create(roomData: CreateRoom) {
    return (await this.roomModel.create(roomData)).toObject();
  }
}
