import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from 'src/redis/redis.module';
import { MessagesController } from './controllers/messages.controller';
import { Message, MessageSchema } from './entities/message.entity';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
    RedisModule,
  ],

  providers: [MessagesService],
  controllers: [MessagesController],
  exports: [MessagesService],
})
export class MessagesModule {}
