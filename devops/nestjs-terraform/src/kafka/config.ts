import { Kafka } from 'kafkajs';

const KAFKA_HOST = process.env.KAFKA_HOST || '';
console.log('KAFKA_HOST: ', KAFKA_HOST);
const KAFKA_PORT = process.env.KAFKA_PORT || '';
console.log('KAFKA_PORT: ', KAFKA_PORT);

export const kafka = new Kafka({
  clientId: 'nestjs-kafka',
  // brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`, `${KAFKA_HOST}:${KAFKA_PORT}`],
  brokers: [`localhost:9093`, `127localhost:9093`],
  // brokers: [`127.0.0.1:9092`, `127.0.0.1:9092`],
});
