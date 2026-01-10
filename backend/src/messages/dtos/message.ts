import { Message } from '../entities/message.entity';

export type CreateMessage = Omit<Message, '_id'>;
