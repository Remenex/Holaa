import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, ObjectId } from 'mongoose';
import { PubSubService } from 'src/redis/service/pub-sub-service';
import { CreateMessage } from '../dtos/message';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,

    private readonly redisPubSub: PubSubService,
  ) {}

  async getMessage(messageId: ObjectId): Promise<Message> {
    const message = await this.messageModel
      .findOne(messageId)
      .populate({
        path: 'fromUserId',
        select: '-password -__v',
      })
      .lean();

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async create(data: CreateMessage) {
    const message = await this.messageModel.create(data);

    const fullMessage = await this.getMessage(message._id);

    await this.redisPubSub.publish('room:message', {
      message: fullMessage,
    });

    return fullMessage;
  }

  async getAllRoomMessages(roomId: string) {
    return this.messageModel
      .find({ roomId })
      .sort({ createdAt: 1 }) // hronološki
      .populate({
        path: 'fromUserId',
        select: '-password -__v',
      })
      .lean();
  }

  async update(messageId: string, text: string) {
    const message = await this.messageModel
      .findByIdAndUpdate(messageId, { text }, { new: true })
      .lean();

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async delete(messageId: string) {
    const message = await this.messageModel.findByIdAndDelete(messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  async deleteRoomMessages(roomId: string): Promise<DeleteResult> {
    return await this.messageModel.deleteMany({ roomId });
  }
}
