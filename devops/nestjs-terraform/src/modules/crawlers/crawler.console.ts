import { Injectable, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import { sleep } from 'src/helpers/utils';
import { CrawlerService } from 'src/modules/crawlers/crawler.service';

@Console()
@Injectable()
export class CrawlerConsole {
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly logger: Logger,
  ) {}
  @Command({
    command: 'crawl',
    description: 'Crawl the web',
  })
  async crawl(): Promise<void> {
    while (true) {
      await this.crawlerService.crawl();
      this.logger.log('Crawling completed');
      await sleep(2000);
    }
  }

  @Command({
    command: 'crawl-nft',
    description: 'Crawl the web once',
  })
  async crawlTransferEventsEth() {
    const fromBlock = 39912338;
    const toBlock = 39913338;
    await this.crawlerService.crawlTransferEventsEth(fromBlock, toBlock);
  }
}
