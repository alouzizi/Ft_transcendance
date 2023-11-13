import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayInit,
    OnGatewayDisconnect,
    WebSocketServer,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageStatus, Status } from '@prisma/client';
  import { UserService } from 'src/users/user.service';
  
  @WebSocketGateway()
  export class MessagesGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(
      private messagesService: MessagesService,
      private prisma: PrismaService,
      private userService: UserService) { }
    @WebSocketServer() wss: Server;
  
    afterInit(server: any) {
      console.log('Gateway Initialized');
    }
  
    async handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected:--------------------------------------- ---> ${client.id}`);
      if (typeof client.handshake.query.senderId === 'string') {
        client.join(client.handshake.query.senderId);
        const senderId = client.handshake.query.senderId;
        const userExists = await this.prisma.user.findUnique({
          where: {
            id: senderId,
          },
        });
  
        if (userExists) {
          try {
            await this.prisma.user.update({
              where: { id: senderId },
              data: {
                status: Status.ACTIF,
              },
            });
  
            await this.prisma.message.updateMany({
              where: {
                receivedId: senderId,
                messageStatus: MessageStatus.NotReceived,
              },
              data: {
                messageStatus: MessageStatus.Received,
              },
            });
  
            const activeUsers = await this.prisma.user.findMany({
              where: {
                status: Status.ACTIF,
              },
            });
            for (const user of activeUsers) {
              this.wss.to(user.id.toString()).emit('updateData', {});
            }
          } catch (error) {
            console.error('Error while handling connection:', error);
          }
        }
      }
    }
  
  
    async handleDisconnect(client: any) {
      console.log(`Client disconnected: ---> ${client.id}`);
      if (typeof client.handshake.query.senderId === 'string') {
        await this.prisma.user.update({
          where: {
            id: client.handshake.query.senderId
          },
          data: {
            status: Status.INACTIF,
            lastSee: new Date()
          }
        })
        const users = await this.prisma.user.findMany();
        for (let i = 0; i < users.length; i++) {
          this.wss.to(users[i].id).emit('updateData', {});
        }
      }
    }
  
    @SubscribeMessage('createMessage')
    async createMessage(
      @MessageBody() createMessageDto: CreateMessageDto,
    ) {
      await this.messagesService.createMessage(this.wss, createMessageDto);
    }
  
    @SubscribeMessage('updateData')
    async updateData(@MessageBody() ids: CreateMessageDto,) {
      this.wss.to(ids.senderId).emit('updateData', {});
      this.wss.to(ids.receivedId).emit('updateData', {});
    }
  
    @SubscribeMessage('isTyping')
    async isTyping(@MessageBody() ids: CreateMessageDto,) {
      this.wss.to(ids.receivedId).emit('isTyping', ids);
    }
  }





