import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { SocketEvent } from 'src/events/event.constant';
import * as fs from 'fs';
import { Client } from 'socket.io/dist/client';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  async handleDisconnect(client: Socket): Promise<void> {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket): Promise<void> {
    this.logger.log(`Client connected: ${client.id}`);

    const token = client.handshake.query?.authorization;
    console.log('token: ', token);

    if (token) {
      try {
        // const payload = verify(token, jwtConstants.accessTokenSecret) as {
        //   sub: number;
        // };
        // client.join(payload.sub);
        this.logger.log(`User payload.sub connected: ${client.id}`);
      } catch (e) {
        this.logger.log(
          `Failed to decode access token for client ${client.id}`,
        );
      }
    } else {
      this.logger.log(`Guest connected: ${client.id}`);
    }
  }

  @SubscribeMessage(SocketEvent.JOIN_ROOM)
  async onJoinRoom(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('JOIN_ROOM: ', body, client.id);
    client.join(body.roomName);
  }

  @SubscribeMessage(SocketEvent.LEAVE_ROOM)
  async onLeaveRoom(
    @MessageBody() body: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('LEAVE_ROOM: ', body, client.id);
    client.join(body.roomName);
  }

  @SubscribeMessage(SocketEvent.NEW_MESSAGE)
  onNewMessage(@MessageBody() body: any) {
    console.log('body: ', body);
    this.server.emit(SocketEvent.NEW_MESSAGE, {
      ...body,
      from: 'server',
    });
  }

  @SubscribeMessage(SocketEvent.NEW_MESSAGE_ROOM)
  onNewMessageRoom(@MessageBody() body: any) {
    console.log('message_room 1: ', body);
    this.server.in(body.roomName).emit(SocketEvent.NEW_MESSAGE_ROOM, {
      ...body,
      from: 'server',
    });
  }

  @SubscribeMessage(SocketEvent.NEW_MESSAGE_ROOM_2)
  onNewMessageRoom2(@MessageBody() body: any) {
    console.log('message_room 2: ', body);
    this.server.in(body.roomName).emit(SocketEvent.NEW_MESSAGE_ROOM_2, {
      ...body,
      from: 'server',
    });
  }

  @SubscribeMessage('requestFile')
  handleFileRequest(
    @MessageBody() data: { fileName: string },
    @ConnectedSocket() client: Socket,
  ): void {
    try {
      const { fileName } = data;
      const filePath = `/Users/thanhle/Desktop/self-study/devops/nestjs-terraform/src/events/test.png`;
      console.log('fileName: ', fileName);
      const readStream = fs.createReadStream(filePath, {
        highWaterMark: 40 * 1024,
      }); // Adjust chunk size as needed
      const stats = fs.statSync(filePath);
      const fileSize = stats.size;

      this.server.to(client.id).emit('fileSize', fileSize);

      readStream.on('data', (chunk) => {
        // console.log('chunk: ', chunk);
        this.server.to(client.id).emit('fileChunk', chunk);
      });
      readStream.on('end', () => {
        this.server.emit('fileComplete');
        console.log('File sent');
      });

      readStream.on('error', (error) => {
        // Handle error, maybe emit an error event to the client
        console.error('File read error:', error);
      });
    } catch (error) {}
  }
}
