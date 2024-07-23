import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'latest_block',
})
export class LatestBlock {
  @PrimaryGeneratedColumn('increment', {
    type: 'int',
    name: 'id',
    comment: 'ID',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'network',
    comment: 'Network name',
  })
  network: string;

  @Column({
    type: 'int',
    name: 'blockNumber',
    comment: 'Block number',
    unsigned: true,
  })
  blockNumber: number;

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
