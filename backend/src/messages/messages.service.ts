import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMessageDto, messageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
import { BlockedUser, Channel, ChannelMember, Friend, Message, MessageStatus, Status, User } from '@prisma/client';
import { NotificationService } from 'src/notification/notification.service';
// import { UserService } from 'src/user/user.service';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) { }


  async createMessage(server: Server, createMessageDto: CreateMessageDto) {
    if (createMessageDto.isDirectMessage == true)
      await this.createDirectMessage(server, createMessageDto);
    else
      await this.createChannelMessage(server, createMessageDto);
  }

  async createDirectMessage(server: Server, createMessageDto: CreateMessageDto) {
    try {
      let notSendTo: string = "";
      let messageStatus: MessageStatus = "NotReceived"
      const blockerUser: BlockedUser = await this.prisma.blockedUser.findFirst({
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

      if (blockerUser) {
        if (blockerUser.senderId === createMessageDto.senderId)
          notSendTo += blockerUser.receivedId;
        else
          notSendTo += blockerUser.senderId;
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: createMessageDto.receivedId,
        }
      })
      if (user.status === "ACTIF" && notSendTo === "")
        messageStatus = "Received"

      const msg = await this.prisma.message.create({
        data: {
          ...createMessageDto,
          receivedId: createMessageDto.receivedId,
          notSendTo,
          messageStatus,
          InfoMessage: false
        },
      });
      const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
      const receivedUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });

      const temp: messageDto = {
        isDirectMessage: true,

        InfoMessage: false,

        senderId: msg.senderId,
        senderName: senderUser.nickname,
        senderPic: senderUser.profilePic,

        contentMsg: msg.content,
        createdAt: msg.createdAt,
        messageStatus: msg.messageStatus,

        receivedId: msg.receivedId,
        receivedName: receivedUser.nickname,
        receivedPic: receivedUser.profilePic,
        receivedStatus: receivedUser.status,
        nbrMessageNoRead: 0,

        OwnerChannelId: '', // no matter
        isChannProtected: false,// no matter



        inGaming: false,

        isBlocked: false // no matter

      }
      if (notSendTo === "") {
        server.to(msg.receivedId).emit('emitNewMessage', temp);
        this.notificationService.createNotification({
          senderId: msg.senderId,
          recieverId: msg.receivedId,
          subject: "send message",
        })
      }
      server.to(msg.senderId).emit('emitNewMessage', temp);
    } catch (error) {
      return { error: true }
    }
  }

  async createChannelMessage(server: Server, createMessageDto: CreateMessageDto) {
    try {
      let notSendTo: string = "";

      const channel = await this.prisma.channel.findUnique({ where: { id: createMessageDto.receivedId } })

      const channelMember = await this.prisma.channelMember.findMany(
        { where: { channelId: createMessageDto.receivedId } });

      const senderUser = await this.prisma.user.findUnique({ where: { id: createMessageDto.senderId } });

      const usersBlocked: BlockedUser[] = await this.prisma.blockedUser.findMany({
        where: {
          OR: [
            { senderId: senderUser.id },
            { receivedId: senderUser.id },
          ],
        }
      });

      for (const block of usersBlocked) {
        if (block.senderId === createMessageDto.senderId)
          notSendTo = notSendTo + block.receivedId + ";";
        else
          notSendTo = notSendTo + block.senderId + ";";
      }

      const msg = await this.prisma.message.create({
        data: {
          ...createMessageDto,
          channelId: createMessageDto.receivedId,
          senderId: createMessageDto.senderId,
          isDirectMessage: false,
          notSendTo,
        },
      });

      for (const member of channelMember) {

        if (msg.notSendTo.includes(member.userId)) continue;

        const temp: messageDto = {
          isDirectMessage: false,

          InfoMessage: false,

          senderId: msg.senderId,
          senderName: senderUser.nickname,
          senderPic: senderUser.profilePic,

          contentMsg: msg.content,
          createdAt: msg.createdAt,
          messageStatus: MessageStatus.NotReceived, // not yet

          receivedId: msg.receivedId,
          receivedName: channel.channelName,
          receivedPic: channel.avatar,
          receivedStatus: Status.INACTIF, // not matter
          nbrMessageNoRead: 0,

          OwnerChannelId: channel.channelOwnerId,
          isChannProtected: channel.protected,

          inGaming: false,
          isBlocked: false // no matter


        }
        server.to(member.userId).emit('emitNewMessage', temp);
      }
    } catch (error) {
      return { error: true }
    }
  }

  async getDirectMessage(senderId: string, receivedId: string) {
    try {
      const msgUserTemp = await this.prisma.message.findMany({
        where: {
          OR: [{ senderId, receivedId },
          { senderId: receivedId, receivedId: senderId },
          ],
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      await this.prisma.message.updateMany({
        where: {
          senderId: receivedId,
          receivedId: senderId,
        },
        data: {
          messageStatus: MessageStatus.Seen,
        },
      });


      const msgUser = msgUserTemp.filter((msg) => (msg.notSendTo === "" || msg.senderId === senderId));
      const result = await Promise.all(
        msgUser.map(async (msg) => {
          const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
          const receivedUser = await this.prisma.user.findUnique({ where: { id: msg.receivedId } });
          const temp: messageDto = {
            isDirectMessage: true,

            InfoMessage: msg.InfoMessage,

            senderId: msg.senderId,
            senderName: senderUser.nickname,
            senderPic: senderUser.profilePic,

            contentMsg: msg.content,
            createdAt: msg.createdAt,
            messageStatus: msg.messageStatus,


            receivedId: msg.receivedId,
            receivedName: receivedUser.nickname,
            receivedPic: receivedUser.profilePic,
            receivedStatus: receivedUser.status,
            nbrMessageNoRead: 0,

            OwnerChannelId: '', // no matter
            isChannProtected: false,// no matter


            inGaming: false,
            isBlocked: (msg.notSendTo.length) ? true : false
          }
          return temp;
        })
      )
      return result;
    } catch (error) {
      return { error: true }
    }
  }

  async getChannelMessage(senderId: string, channelId: string) {
    try {
      const msgUserTemp: Message[] = await this.prisma.message.findMany({
        where: {
          isDirectMessage: false,
          channelId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const channel = await this.prisma.channel.findUnique({ where: { id: channelId } })
      const user: ChannelMember = await this.prisma.channelMember.findFirst({ where: { userId: senderId, channelId } })
      if (user) {
        const result = await Promise.all(
          msgUserTemp
            .filter((msg: Message) => {
              return (!msg.notSendTo.includes(senderId) && user.createdAt < msg.createdAt)
                || (msg.content.includes('create') ||
                  msg.content.includes('add') ||
                  (msg.content.includes('create'))
                  && msg.InfoMessage == true)
            })
            .map(async (msg: Message) => {
              const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
              const temp: messageDto = {
                isDirectMessage: false,

                InfoMessage: msg.InfoMessage,

                senderId: msg.senderId,
                senderName: senderUser.nickname,
                senderPic: senderUser.profilePic,

                contentMsg: msg.content,
                createdAt: msg.createdAt,
                messageStatus: MessageStatus.NotReceived, // not yet

                receivedId: msg.receivedId,
                receivedName: channel.channelName,
                receivedPic: channel.avatar,
                receivedStatus: Status.INACTIF, // not matter
                nbrMessageNoRead: 0,

                OwnerChannelId: channel.channelOwnerId,
                isChannProtected: channel.protected,
                inGaming: false,

                isBlocked: false // no matter


              }
              return temp;
            })
        )
        return result;
      }
    } catch (error) {
      return { error: true }
    }
  }

  async getLastMessages(senderId: string, receivedId: string) {

    const lastMessage = await this.prisma.message.findFirst({
      where: {
        OR: [
          {
            senderId,
            receivedId,
            notSendTo: ""
          },
          {
            senderId: receivedId,
            receivedId: senderId,
            notSendTo: ""
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return lastMessage;

  }

  async getChannleForMsg(senderId: string) {

    let result: messageDto[] = [];
    let myChannels: Channel[] = [];

    const channelMembers: ChannelMember[] = await this.prisma.channelMember.findMany({
      where: {
        userId: senderId
      }
    });

    for (const ch of channelMembers) {
      const channel: Channel = await this.prisma.channel.findUnique({ where: { id: ch.channelId } });
      myChannels.push(channel);
    }

    for (const channel of myChannels) {
      const lastMessageChannel: Message = await this.prisma.message.findFirst({
        where: {
          isDirectMessage: false,
          channelId: channel.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      const userSender = await this.prisma.user.findUnique({ where: { id: lastMessageChannel.senderId } });
      const temp: messageDto = {
        isDirectMessage: false,

        InfoMessage: false,

        senderId: lastMessageChannel.senderId,
        senderName: userSender.nickname,
        senderPic: userSender.profilePic, // no matter

        contentMsg: lastMessageChannel.content,
        createdAt: lastMessageChannel.createdAt,
        messageStatus: lastMessageChannel.messageStatus,

        receivedId: channel.id,
        receivedName: channel.channelName,
        receivedPic: channel.avatar,
        receivedStatus: Status.INACTIF, // no matter
        nbrMessageNoRead: 0,

        OwnerChannelId: channel.channelOwnerId,
        isChannProtected: channel.protected,

        inGaming: false,

        isBlocked: false // no matter

      }
      result.push(temp);

    }

    const channlesPublic: Channel[] = await this.prisma.channel.findMany({
      where: { channelType: "Public" }
    })

    for (const chl of channlesPublic) {
      let find: boolean = false;
      for (const mych of myChannels) {
        if (mych.id === chl.id) {
          find = true;
          break;
        }
      }
      const bannedMember = await this.prisma.bannedMember.findMany({ where: { userId: senderId, channelId: chl.id } })
      if (find || bannedMember.length) continue;
      const temp: messageDto = {
        isDirectMessage: false,

        InfoMessage: false,

        senderId: '',
        senderName: "",
        senderPic: "", // no matter

        contentMsg: "",
        createdAt: new Date(),
        messageStatus: "Received",

        receivedId: chl.id,
        receivedName: chl.channelName,
        receivedPic: chl.avatar,
        receivedStatus: Status.INACTIF, // no matter
        nbrMessageNoRead: 0,

        OwnerChannelId: chl.channelOwnerId,
        isChannProtected: chl.protected,

        inGaming: false,

        isBlocked: false // no matter
      }
      result.push(temp);
    }
    return result;

  }

  async getMessageForList(senderId: string) {
    try {
      let resultDirect: messageDto[] = [];
      const resultChannel = await this.getChannleForMsg(senderId);

      const userToUersMsg = await this.prisma.message.findMany({
        where: {
          OR: [
            { senderId: senderId, isDirectMessage: true },
            { receivedId: senderId, isDirectMessage: true }
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const distinctUserIds = new Set<string>();
      for (const msg of userToUersMsg) {
        if (msg.senderId === senderId) {
          distinctUserIds.add(msg.receivedId);
        } else {
          distinctUserIds.add(msg.senderId);
        }
      }

      const idUsersArray = Array.from(distinctUserIds);
      let usersList: User[] = [];
      for (const id of idUsersArray) {
        const user: User = await this.prisma.user.findUnique({ where: { id } })
        usersList.push(user);
      }

      for (const user of usersList) {
        const lastMessage = await this.getLastMessages(senderId, user.id);

        const forNbrMessageNoRead: Message[] = await this.prisma.message.findMany(
          {
            where: {
              senderId: user.id,
              receivedId: senderId,
              notSendTo: "",
              messageStatus: {
                in: [MessageStatus.NotReceived, MessageStatus.Received],
              },
            }
          }
        );

        const isblcked = await this.prisma.blockedUser.findMany({
          where: {
            OR: [{ senderId: senderId, receivedId: user.id },
            { senderId: user.id, receivedId: senderId }]
          }
        })
        const tmp: messageDto = {
          isDirectMessage: true,

          InfoMessage: false,

          senderId: '',  // no matter
          senderName: '',  // no matter
          senderPic: '', // no matter

          contentMsg: lastMessage.content,
          createdAt: lastMessage.createdAt,
          messageStatus: lastMessage.messageStatus,

          receivedId: user.id,
          receivedName: user.nickname,
          receivedPic: user.profilePic,
          receivedStatus: user.status,
          nbrMessageNoRead: isblcked.length ? 0 : forNbrMessageNoRead.length,

          OwnerChannelId: '', // no matter
          isChannProtected: false, // no matter


          inGaming: user.inGaming,

          isBlocked: isblcked.length ? true : false,
        }
        resultDirect.push(tmp);
      }

      const friends: Friend[] = await this.prisma.friend.findMany({
        where: {
          OR: [
            { senderId: senderId },
            { receivedId: senderId },
          ]
        }
      });
      for (const friend of friends) {
        let idU: string = "";
        if (senderId === friend.senderId) idU = friend.receivedId;
        if (senderId === friend.receivedId) idU = friend.senderId;
        if (idUsersArray.includes(idU)) continue;
        const user: User = await this.prisma.user.findUnique({ where: { id: idU } })
        const tmp: messageDto = {
          isDirectMessage: true,

          InfoMessage: false,

          senderId: '',  // no matter
          senderName: '',  // no matter
          senderPic: '', // no matter

          contentMsg: "",
          createdAt: new Date(),
          messageStatus: "Received",

          receivedId: user.id,
          receivedName: user.nickname,
          receivedPic: user.profilePic,
          receivedStatus: user.status,
          nbrMessageNoRead: 0,

          OwnerChannelId: '', // no matter
          isChannProtected: false,// no matter

          inGaming: false,

          isBlocked: false // no matter

        }
        resultDirect.push(tmp);

      }
      const result = [...resultDirect, ...resultChannel]


      result.sort((a: messageDto, b: messageDto) => {
        const myDate1 = new Date(a.createdAt);
        const myDate2 = new Date(b.createdAt);
        return myDate2.getTime() - myDate1.getTime();
      });
      return result;

    } catch (error) {
      return { error: true }
    }
  }
}
