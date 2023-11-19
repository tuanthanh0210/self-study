import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { ConsoleModule } from 'nestjs-console';
import { AppConsole } from 'src/app.console';
import { EventsModule } from 'src/events/event.module';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repo';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      entities: [User],
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([UserRepository]),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
    ConsoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConsole],
})
export class AppModule {}
