import { Global, Module } from '@nestjs/common';
import { EtherService } from 'src/modules/ether/ether.service';

@Global()
@Module({
  providers: [EtherService],
  exports: [EtherService],
})
export class EtherModule {}
