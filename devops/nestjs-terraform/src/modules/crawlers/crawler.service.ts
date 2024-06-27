import { Injectable } from '@nestjs/common';
import { pancakeSquadNftAbi } from 'src/abis/nft';
import { transformReturnValueNft } from 'src/helpers/utils';
import { Web3Service } from 'src/modules/web3/web3.service';
import axios from 'axios';

@Injectable()
export class CrawlerService {
  constructor(private readonly web3Service: Web3Service) {}
  async crawl(): Promise<void> {
    console.log('Crawling...');
    const web3 = this.web3Service.getWeb3();
    const blockNumber = await web3.eth.getBlockNumber();
    console.log('Latest block number:', Number(blockNumber));
  }

  async crawlTransferEventsNft(fromBlock, toBlock) {
    // const latestBlock = Number(await web3.eth.getBlockNumber());
    // console.log("latestBlock: ", latestBlock);

    const pancakeSquadContract = this.web3Service.getContractPanCakeSquadNft();

    const res: any = await pancakeSquadContract.getPastEvents(
      // @ts-ignore
      'Transfer',
      {
        fromBlock,
        toBlock,
      },
    );

    console.log('res: ', transformReturnValueNft(res.slice(0, 1)));
    await this.getTokenURI(res[0].returnValues.tokenId);
    // await this.getMetadata(res[0].returnValues.tokenId);
  }

  async getTokenURI(tokenId) {
    const pancakeSquadContract = this.web3Service.getContractPanCakeSquadNft();

    const res: any = await pancakeSquadContract.methods
      .tokenURI(tokenId)
      .call();
    console.log('getTokenURI: ', res);
  }

  async getMetadata(tokenId) {
    const tokenURI = await this.getTokenURI(tokenId);

    // const res: any = await pancakeSquadContract.methods
    //   .metadata(tokenId)
    //   .call();
    const res = await axios.get(`${tokenURI}`);
    console.log('getMetadata: ', res.data);
  }
}
