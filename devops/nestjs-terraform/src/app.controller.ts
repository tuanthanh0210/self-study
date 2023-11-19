import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user-mysql')
  getUserMysql() {
    return this.appService.getUserMysql();
  }
  @Post('user-mysql')
  postUserMysql() {
    return this.appService.postUserMysql();
  }

  @Get('random-number-redis')
  getUserRedis() {
    return this.appService.getUserRedis();
  }
  @Post('random-number-redis')
  postUserRedis() {
    return this.appService.postUserRedis();
  }
}
