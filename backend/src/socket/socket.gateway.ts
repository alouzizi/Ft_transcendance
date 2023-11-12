import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { SocketGatewayService } from './socket.service';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private socketGatewayService: SocketGatewayService,
    private messagesService: MessagesService
  ) { }

  @WebSocketServer() wss: Server;

  afterInit(server: any) {
    console.log('Gateway Initialized');
  }

  async handleConnection(client: Socket) {
    this.socketGatewayService.handleConnection(client, this.wss);
  }


  async handleDisconnect(client: Socket) {
    this.socketGatewayService.handleDisconnect(client, this.wss);
  }

  @SubscribeMessage('createMessage')
  async createMessage(@MessageBody() createMessageDto: CreateMessageDto,) {
    await this.messagesService.createMessage(this.wss, createMessageDto);
  }

  @SubscribeMessage('updateData')
  async updateData(@MessageBody() ids: CreateMessageDto,) {
    this.socketGatewayService.updateData(ids, this.wss);
  }

  @SubscribeMessage('isTyping')
  async isTyping(@MessageBody() ids: CreateMessageDto,) {
    this.wss.to(ids.receivedId).emit('isTyping', ids);
  }
}
