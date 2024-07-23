import { CrawlerModule } from 'src/modules/crawlers/crawler.module';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { AppConsole } from 'src/app.console';
import { User } from 'src/models/entities/user.entity';
import { EventsModule } from 'src/events/event.module';
import { UserRepository } from 'src/models/repositories/user.repo';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { RedisModule } from 'src/modules/redis/redis.module';
import { EtherModule } from 'src/modules/ether/ether.module';
import { Web3Module } from 'src/modules/web3/web3.module';
import { LatestBlock } from 'src/models/entities/latestBlock.entity';
import { Nft721 } from 'src/models/entities/nft.entity';

@Module({
  imports: [
    Web3Module,
    EtherModule,
    EventsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      entities: [User, LatestBlock, Nft721],
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([UserRepository]),
    RedisModule,
    ConsoleModule,
    CrawlerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConsole],
})
export class AppModule {}
