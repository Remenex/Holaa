import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Message {
  _id: ObjectId;

  @Prop({ required: true, ref: User.name })
  fromUserId: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  text: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
