import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class Room {
  _id: ObjectId;

  @Prop({ required: true })
  movieId: string;

  @Prop({ required: true })
  creatorId: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
