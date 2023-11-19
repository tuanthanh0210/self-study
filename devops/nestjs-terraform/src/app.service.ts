import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repo';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUserMysql() {
    const rs = await this.userRepo.find();
    return {
      data: rs,
    };
  }
  postUserMysql() {
    const user = {
      firstName: `A${Math.floor(Math.random() * 1000)}`,
      lastName: `A${Math.floor(Math.random() * 1000)}`,
      isActice: true,
    };
    this.userRepo.save(user);
    return user;
  }

  async getUserRedis() {
    const rs = (await this.cache.get('random-number')) || 0;
    return {
      data: rs,
    };
  }
  async postUserRedis() {
    await this.cache.set('random-number', Math.floor(Math.random() * 100));
    const rs = await this.cache.get('random-number');
    return {
      data: rs,
    };
  }
}
