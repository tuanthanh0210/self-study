// service.ts - a nestjs provider using console decorators
import { Injectable } from '@nestjs/common';
import { Console, Command } from 'nestjs-console';
import { kafka } from 'src/kafka/config';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Console()
@Injectable()
export class AppConsole {
  @Command({
    command: 'test',
    description: 'Demo Console',
  })
  async listContent(): Promise<void> {
    console.log('Hello World');
  }

  @Command({
    command: 'kp',
    description: 'kafkaProducer',
  })
  async kafkaProducer(): Promise<void> {
    const producer = kafka.producer();

    await producer.connect();
    console.log('kafkaProducer connected');
    while (true) {
      await producer.send({
        topic: 'test-topic',
        messages: [{ value: 'Hello KafkaJS user!' }],
      });
      console.log('send message');

      await sleep(3000);
      // await producer.disconnect();
    }
  }

  @Command({
    command: 'kc',
    description: 'kafkaConsumer',
  })
  async kafkaConsumer(): Promise<void> {
    console.log('kafkaConsumer');
    const consumer = kafka.consumer({ groupId: 'test-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    while (true) {
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
          });
        },
      });
      await sleep(3000);
    }
  }
}
