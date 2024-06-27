// service.ts - a nestjs provider using console decorators
import { Injectable } from '@nestjs/common';
import { Console, Command } from 'nestjs-console';
import { kafka } from 'src/kafka/config';
import { KafkaClient } from 'src/kafka/kafka-client';

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
    const producer = kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000,
    });

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
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
      },
    });
    await sleep(3000);
  }

  @Command({
    command: 'kp1',
    description: 'kafkaProducerConsumer',
  })
  async kp1(): Promise<void> {
    while (true) {
      const kafkaClient = new KafkaClient();
      const topic = 'test-topic';
      const message = 'Hello KafkaJS user!';
      kafkaClient.send(topic, message);
      await sleep(3000);
    }
  }
  @Command({
    command: 'kc1',
    description: 'kafkaProducerConsumer',
  })
  async kc1(): Promise<void> {
    const kafkaClient = new KafkaClient();
    const topic = 'test-topic';
    const groupId = 'test-group';
    const callback = async (data) => console.log('data: ', data);

    kafkaClient.consume(topic, groupId, callback);
  }
}
