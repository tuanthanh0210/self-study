import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { pancakeSquadNftAbi } from 'src/abis/nft';

@Injectable()
export class EtherService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    const providerUrl = 'https://rpc.ankr.com/bsc';
    this.provider = new ethers.JsonRpcProvider(providerUrl);
  }

  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber();
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  getTransaction(txHash: string): Promise<ethers.TransactionResponse> {
    return this.provider.getTransaction(txHash);
  }

  getPancakeSquadContract(): ethers.Contract {
    return new ethers.Contract(
      '0x0a8901b0e25deb55a87524f0cc164e9644020eba',
      pancakeSquadNftAbi,
      this.provider,
    );
  }
}
