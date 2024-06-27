import { Injectable } from '@nestjs/common';
import { pancakeSquadNftAbi } from 'src/abis/nft';
import { transformReturnValueNft } from 'src/helpers/utils';
import { Web3Service } from 'src/modules/web3/web3.service';

@Injectable()
export class CrawlerService {
  constructor(private readonly web3Service: Web3Service) {}
  async crawl(): Promise<void> {
    console.log('Crawling...');
    const web3 = this.web3Service.getWeb3();
    const blockNumber = await web3.eth.getBlockNumber();
    console.log('Latest block number:', Number(blockNumber));
  }

  async crawlTransferEventsEth(fromBlock, toBlock) {
    // const latestBlock = Number(await web3.eth.getBlockNumber());
    // console.log("latestBlock: ", latestBlock);
    const pancakeSquadContractAddress =
      '0x0a8901b0e25deb55a87524f0cc164e9644020eba';
    const web3 = this.web3Service.getWeb3();

    const pancakeSquadContract = new web3.eth.Contract(
      pancakeSquadNftAbi,
      pancakeSquadContractAddress,
    );

    const res: any = await pancakeSquadContract.getPastEvents(
      // @ts-ignore
      'Transfer',
      {
        fromBlock,
        toBlock,
      },
      function (error, events) {
        console.log(events);
      },
    );

    console.log('res: ', transformReturnValueNft(res));
  }
}
