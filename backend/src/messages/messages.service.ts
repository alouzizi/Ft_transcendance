import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
import { MessageStatus } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(server: Server, createMessageDto: CreateMessageDto) {
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
    const msg = await this.prisma.directMessage.create({
      data: {
        ...createMessageDto,
        showed,
        messageStatus
      },
    });
    if (showed)
      server.to(msg.receivedId.toString()).emit('findMsg2UsersResponse', msg);
    server.to(msg.senderId.toString()).emit('findMsg2UsersResponse', msg);
  }


  async getMessage(senderId: number, receivedId: number) {
    const msgUserTemp = await this.prisma.directMessage.findMany({
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
    return msgUser;
  }

  async getLastMessages(senderId: number, receivedId: number) {
    const lastMessage = await this.prisma.directMessage.findFirst({
      where: {
        OR: [
          {
            senderId,
            receivedId,
            showed: true,
          },
          {
            senderId: receivedId,
            receivedId: senderId,
            showed: true
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!lastMessage) {
      return {
        content: "",
        createdAt: 5
      }
    }
    return lastMessage;
  }
}
