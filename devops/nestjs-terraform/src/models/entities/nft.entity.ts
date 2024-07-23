import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Nft721 {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
    comment: 'ID',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'contractAddress',
    comment: 'Contract address',
    length: 42,
  })
  contractAddress: string;

  @Column({
    type: 'int',
    name: 'tokenId',
    comment: 'Token ID',
    unsigned: true,
  })
  tokenId: number;

  @Column({
    type: 'varchar',
    name: 'fromAddress',
    comment: 'From address',
    length: 42,
  })
  fromAddress: string;

  @Column({
    type: 'varchar',
    name: 'toAddress',
    comment: 'To address',
    length: 42,
  })
  toAddress: string;

  @Column({
    type: 'int',
    name: 'blockNumber',
    comment: 'Block number',
    unsigned: true,
  })
  blockNumber: number;

  @Column({
    type: 'varchar',
    name: 'transactionHash',
    comment: 'Transaction hash',
    length: 66,
  })
  transactionHash: string;

  @Column({
    type: 'varchar',
    name: 'blockHash',
    comment: 'Block hash',
    length: 66,
  })
  blockHash: string;

  @Column({
    type: 'varchar',
    name: 'event',
    comment: 'Event',
    length: 255,
  })
  event: string;

  @Column({
    type: 'text',
    name: 'metadata',
    comment: 'Metadata',
    nullable: true,
  })
  metadata: string;

  @Column({
    type: 'text',
    name: 'tokenURI',
    comment: 'Token URI',
    nullable: true,
  })
  tokenURI: string;

  @Column({
    type: 'timestamp',
    name: 'createdAt',
    comment: 'Created at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updatedAt',
    comment: 'Updated at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
