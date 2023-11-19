// service.ts - a nestjs provider using console decorators
import { Injectable } from '@nestjs/common';
import { Console, Command } from 'nestjs-console';

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
}
