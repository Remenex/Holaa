import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';

@Schema({ timestamps: true })
export class Movie {
  _id: ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], default: [] })
  categories: Types.ObjectId[];

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

  @Prop()
  imdb: number;

  @Prop()
  duration: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
