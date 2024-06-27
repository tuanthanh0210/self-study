import { Logger, Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerConsole } from './crawler.console';
import { Web3Module } from 'src/modules/web3/web3.module';

@Module({
  imports: [Web3Module],
  providers: [CrawlerService, CrawlerConsole, Logger],
})
export class CrawlerModule {}
