import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
  ],
  providers: [],
  exports: [],
})
export class RedisModule {}
