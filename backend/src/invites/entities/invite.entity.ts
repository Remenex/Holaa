import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { InviteStatus } from '../dtos/invite';

@Schema({ timestamps: true })
export class Invite {
  _id: ObjectId;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true, ref: User.name })
  fromUserId: string;

  @Prop({ required: true })
  toUserId: string;

  @Prop({ required: true, enum: InviteStatus })
  status: InviteStatus;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);
