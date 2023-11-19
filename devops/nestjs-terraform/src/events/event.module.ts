import { Module } from '@nestjs/common';
import { EventsGateway } from 'src/events/event.gateway';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  providers: [EventsGateway],
  imports: [
    CacheModule.register({
      // store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
  ],
})
export class EventsModule {}
