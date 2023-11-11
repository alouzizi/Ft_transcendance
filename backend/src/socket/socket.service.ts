import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server, Socket } from 'socket.io';
import { MessageStatus, Status } from '@prisma/client';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';

@Injectable()
export class SocketGatewayService {

  constructor(
    private prisma: PrismaService,) { }



  async handleConnection(client: Socket, wss: Server) {
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
              senderId: ""
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
            wss.to(user.id.toString()).emit('updateData', {});
          }
        } catch (error) {
          console.error('Error while handling connection:', error);
        }
      }
    }
  }

  async handleDisconnect(client: Socket, wss: Server) {
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
        wss.to(users[i].id).emit('updateData', {});
      }
    }
  }


  async updateData(ids: CreateMessageDto, wss: Server) {
    wss.to(ids.senderId).emit('updateData', {});
    if (ids.isDirectMessage === false) {
      const channelMembers = await this.prisma.channelMember.findMany({ where: { channelId: ids.receivedId } })
      for (const member of channelMembers) {
        wss.to(member.userId).emit('updateData', {});
      }
    } else
      wss.to(ids.receivedId).emit('updateData', {});
  }

}
