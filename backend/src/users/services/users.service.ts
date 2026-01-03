import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { Model } from 'mongoose';
import { CreateUser } from '../dtos/user';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @Inject('RedisClient') private readonly redis: Redis,
  ) {}

  async findAll() {
    return this.userModel.find().select('-password').lean();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new NotFoundException('User not found');
    if (user.password) delete user.password;
    return user;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }

  async create(userData: CreateUser) {
    if ((await this.userModel.findOne({ email: userData.email })) !== null) {
      throw new ConflictException('Email already exists');
    }

    userData.password = await this.hashPassword(userData.password);

    return (await this.userModel.create(userData)).toObject();
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 6);
  }

  getKey(id: string) {
    return `user:${id}`;
  }

  async getCachedUser(id: string) {
    const key = this.getKey(id);
    const cached = await this.redis.hgetall(key);
    if (Object.keys(cached).length) {
      return cached;
    }

    return await this.cacheUser(id);
  }

  async cacheUser(id: string) {
    const key = this.getKey(id);
    const user = this.findById(id);

    if (!user) return;

    await this.redis.hset(key, user);
    await this.redis.expire(key, 3600);

    return user;
  }

  async invalidate(userId: string) {
    await this.redis.del(this.getKey(userId));
  }
}
