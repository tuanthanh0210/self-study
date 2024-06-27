import { Injectable } from '@nestjs/common';
import { pancakeSquadNftAbi } from 'src/abis/nft';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  private web3: Web3;

  // constructor(private configService: ConfigService) {
  //   const providerUrl = this.configService.get<string>('WEB3_PROVIDER_URL');
  //   this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  // }
  constructor() {
    const providerUrl = 'https://rpc.ankr.com/bsc';
    this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
  }

  getWeb3() {
    return this.web3;
  }
}
