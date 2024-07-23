import { LatestBlock } from 'src/models/entities/latestBlock.entity';
import { Connection, getRepository } from 'typeorm';

export async function seedDatabase(connection: Connection) {
  try {
    const latestBlockRepo = getRepository(LatestBlock);

    const seedData = [
      {
        network: 'bnb',
        blockNumber: Number(process.env.START_BLOCK_NUMBER),
        createdAt: new Date(),
      },
    ];

    for (const data of seedData) {
      const latestBlock = latestBlockRepo.create(data);
      await latestBlockRepo.save(latestBlock);
    }

    console.log('Seed data inserted');
    await connection.close();
  } catch (error) {
    console.log('error: ', error);
  }
}
