import { Injectable } from '@nestjs/common';
import { CreateMessageDto, SendMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
import { MessageStatus } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService
  ) { }

  async createDirectMessage(server: Server, createMessageDto: CreateMessageDto) {
    let showed: boolean = true;
    let messageStatus: MessageStatus = "NotReceived"

    const blockerUser = await this.prisma.blockedUser.findMany({
      where: {
        OR: [
          {
            senderId: createMessageDto.senderId,
            receivedId: createMessageDto.receivedId
          },
          {
            senderId: createMessageDto.receivedId,
            receivedId: createMessageDto.senderId
          }
        ]
      }
    })

    if (blockerUser.length) {
      showed = false;
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: createMessageDto.receivedId,
      }
    })
    if (user.status === "ACTIF")
      messageStatus = "Received"

    const msg = await this.prisma.message.create({
      data: {
        ...createMessageDto,
        receivedId: createMessageDto.receivedId,
        isDirectMessage: true,
        showed,
        messageStatus,
      },
    });
    const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
    const temp: SendMessageDto = {
      isDirectMsg: true,
      id: msg.id,
      content: msg.content,
      createdAt: msg.createdAt,
      senderId: msg.senderId,
      receivedId: msg.receivedId,
      messageStatus: msg.messageStatus,
      avata: senderUser.profilePic,
      nickName: senderUser.nickname,
      nameChannel: "null"
    }
    if (showed)
      server.to(msg.receivedId).emit('findMsg2UsersResponse', temp);
    server.to(msg.senderId).emit('findMsg2UsersResponse', temp);
  }

  async createChannelMessage(server: Server, createMessageDto: CreateMessageDto) {
    const msg = await this.prisma.message.create({
      data: {
        ...createMessageDto,
        channelId: createMessageDto.receivedId,
        senderId: createMessageDto.senderId,
        isDirectMessage: false,
      },
    });
    const channel = await this.prisma.channel.findUnique({ where: { id: createMessageDto.receivedId } })
    const channelMember = await this.prisma.channelMember.findMany(
      { where: { channelId: createMessageDto.receivedId } });
    const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
    for (const member of channelMember) {
      const temp: SendMessageDto = {
        isDirectMsg: false,
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt,
        senderId: msg.senderId,
        receivedId: msg.receivedId,
        messageStatus: msg.messageStatus,
        avata: senderUser.profilePic,
        nickName: senderUser.nickname,
        nameChannel: channel.channelName

      }
      server.to(member.userId).emit('findMsg2UsersResponse', temp);
    }
  }

  async createMessage(server: Server, createMessageDto: CreateMessageDto) {
    if (createMessageDto.isDirectMessage == true)
      await this.createDirectMessage(server, createMessageDto);
    else
      await this.createChannelMessage(server, createMessageDto);
  }


  async getDirectMessage(senderId: string, receivedId: string) {
    const msgUserTemp = await this.prisma.message.findMany({
      where: {
        OR: [
          {
            senderId,
            receivedId,
          },
          {
            senderId: receivedId,
            receivedId: senderId,
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    const msgUser = msgUserTemp.filter((msg) => (msg.showed === true || senderId === msg.senderId));
    const result = await Promise.all(
      msgUser.map(async (msg) => {
        const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
        const temp: SendMessageDto = {
          isDirectMsg: true,
          id: msg.id,
          content: msg.content,
          createdAt: msg.createdAt,
          senderId: msg.senderId,
          receivedId: msg.receivedId,
          messageStatus: msg.messageStatus,
          avata: senderUser.profilePic,
          nickName: senderUser.nickname,
          nameChannel: ""

        }
        return temp;
      })
    )
    return result;
  }


  async getChannelMessage(senderId: string, channelId: string) {
    const msgUserTemp = await this.prisma.message.findMany({
      where: {
        isDirectMessage: false,
        channelId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    const channel = await this.prisma.channel.findUnique({ where: { id: channelId } })
    const result = await Promise.all(
      msgUserTemp.map(async (msg) => {
        const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
        const temp: SendMessageDto = {
          isDirectMsg: false,
          id: msg.id,
          content: msg.content,
          createdAt: msg.createdAt,
          senderId: msg.senderId,
          receivedId: msg.receivedId,
          messageStatus: msg.messageStatus,
          avata: senderUser.profilePic,
          nickName: senderUser.nickname,
          nameChannel: channel.channelName

        }
        return temp;
      })
    )
    return result;
  }


  async getLastMessages(senderId: string, receivedId: string) {
    const lastMessage = await this.prisma.message.findFirst({
      where: {
        OR: [
          {
            senderId,
            receivedId,
          },
          {
            senderId: receivedId,
            receivedId: senderId,
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return lastMessage;
  }
}
