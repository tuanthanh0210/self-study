import { Injectable, Logger } from '@nestjs/common';
import { create } from 'domain';
import { EventLog, Log } from 'ethers';
import { Command, Console } from 'nestjs-console';
import { sleep } from 'src/helpers/utils';
import { seedDatabase } from 'src/models/seed/init_sql';
import { CrawlerService } from 'src/modules/crawlers/crawler.service';
import { EtherService } from 'src/modules/ether/ether.service';
import { getConnection } from 'typeorm';

@Console()
@Injectable()
export class CrawlerConsole {
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly logger: Logger,
    private readonly etherService: EtherService,
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
  async crawlTransferEventsNft() {
    const fromBlock = 39912338;
    const toBlock = 39913338;
    await this.crawlerService.crawlTransferEventsNft(fromBlock, toBlock);

    // event:  [
    //   {
    //     event: 'Transfer',
    //     contractAddress: '0x0a8901b0e25deb55a87524f0cc164e9644020eba',
    //     lastBlock: 39912347,
    //     from: '0x0Edc167A6E5c466BD04AA4f5329E6a7208A57061',
    //     to: '0x221643bb1D0EaCdB9AC182b5b0F9c90803203bA9',
    //     tokenId: 8524
    //   },
    //   {
    //     event: 'Transfer',
    //     contractAddress: '0x0a8901b0e25deb55a87524f0cc164e9644020eba',
    //     lastBlock: 39912358,
    //     from: '0xe9Cd3523283e938a743AF2bc466AbA1B81df7D3c',
    //     to: '0x221643bb1D0EaCdB9AC182b5b0F9c90803203bA9',
    //     tokenId: 5045
    //   }
    // ]
  }

  @Command({
    command: 'test-ethers',
    description: 'Crawl the web once',
  })
  async testEthers() {
    // const blockNumber = await this.etherService.getBlockNumber();
    // console.log('blockNumber: ', blockNumber);

    // const balance = await this.etherService.getBalance(
    //   '0x241F1750AD2EEb216DeB380E8E27dA3677007649',
    // );
    // console.log('balance: ', balance);

    const pancakeSquadContract = this.etherService.getPancakeSquadContract();

    /*
    const filter = pancakeSquadContract.filters.Transfer(fromAddress, toAddress, tokenId);
      - if Transfer doesn't pass in any arguments, it will return all Transfer events  
      - if Transfer pass in arguments, it will return Transfer events that match the arguments: fromAddress, toAddress, tokenId
    */
    const filter = pancakeSquadContract.filters.Transfer;

    const fromBlock = 39912338;
    const toBlock = 39913338;
    const events = await pancakeSquadContract.queryFilter(
      filter,
      fromBlock,
      toBlock,
    );
    console.log(
      'events: ',
      events.slice(0, 2).map((e: EventLog) => ({
        contractAddress: e.address,
        blockNumber: e.blockNumber,
        transactionHash: e.transactionHash,
        blockHash: e.blockHash,
        fromAddress: e.args[0],
        toAddress: e.args[1],
        tokenId: Number(e.args[2]),
      })),
    );

    // events:  [
    //   {
    //     contractAddress: '0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
    //     blockNumber: 39912347,
    //     transactionHash: '0x10334b892eb6702687b1ef40f689b002bd042c0426e883c55ed549afef73a35e',
    //     blockHash: '0xa7ac5a8cd78758d9b6d54fdcdc79411a1f79cfd3e9c52945c6c0ab7e012e295b',
    //     fromAddress: '0x0Edc167A6E5c466BD04AA4f5329E6a7208A57061',
    //     toAddress: '0x221643bb1D0EaCdB9AC182b5b0F9c90803203bA9',
    //     tokenId: 8524
    //   },
    //   {
    //     contractAddress: '0x0a8901b0E25DEb55A87524f0cC164E9644020EBA',
    //     blockNumber: 39912358,
    //     transactionHash: '0x967484ac7da1592cfc725dc36cb62bb6a0534dd4b3e8d8c6b94fb07cdd4c07ba',
    //     blockHash: '0x4b9dba7626945e09cdcf457e2ea35e9ae73cb70beccd31da6854258ced59d27b',
    //     fromAddress: '0xe9Cd3523283e938a743AF2bc466AbA1B81df7D3c',
    //     toAddress: '0x221643bb1D0EaCdB9AC182b5b0F9c90803203bA9',
    //     tokenId: 5045
    //   }
    // ]
  }
}
