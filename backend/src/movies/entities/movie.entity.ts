import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class Movie {
  _id: ObjectId;

  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop()
  mainCharacterImage: string;

  @Prop()
  ownerId: string;

  @Prop()
  thumbnail: string;

  @Prop()
  title: string;

  @Prop()
  trailer: string;

  @Prop()
  video: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
