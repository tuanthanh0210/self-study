import { LatestBlock } from 'src/models/entities/latestBlock.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(LatestBlock)
export class LatestBlockRepo {}
