import { Global, Module } from '@nestjs/common';
import { Web3Service } from 'src/modules/web3/web3.service';

@Global()
@Module({
  providers: [Web3Service],
  exports: [Web3Service],
})
export class Web3Module {}
