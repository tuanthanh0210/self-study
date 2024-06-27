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

  getContract(abi, address) {
    return new this.web3.eth.Contract(abi, address);
  }

  getContractPanCakeSquadNft() {
    return this.getContract(
      pancakeSquadNftAbi,
      '0x0a8901b0e25deb55a87524f0cc164e9644020eba',
    );
  }
}
