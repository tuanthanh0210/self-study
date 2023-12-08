import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from 'src/adapter/redis-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisIoAdapter: RedisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  // const cors = {
  //   origin: ['*'],
  //   methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   credentials: true,
  //   allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  // };
  app.enableCors();
  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(8000);
}
bootstrap();
