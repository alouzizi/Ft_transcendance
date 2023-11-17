import { Injectable } from '@nestjs/common';
import { CreateMessageDto, messageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
<<<<<<< HEAD
import { Channel, Message, MessageStatus, Status, User } from '@prisma/client';
import { UserService } from 'src/users/user.service';
=======
import { BlockedUser, Channel, ChannelMember, Friend, Message, MessageStatus, Status, User } from '@prisma/client';
// import { UserService } from 'src/user/user.service';
>>>>>>> origin/lhoussin

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
<<<<<<< HEAD
    private userService: UserService,
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
    const receivedUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });

    const temp: messageDto = {
      isDirectMsg: true,

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
      const temp: messageDto = {
        isDirectMsg: false,
=======
    // private userService: UserService,
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
>>>>>>> origin/lhoussin

        senderId: msg.senderId,
        senderName: senderUser.nickname,
        senderPic: senderUser.profilePic,

        contentMsg: msg.content,
        createdAt: msg.createdAt,
<<<<<<< HEAD
        messageStatus: MessageStatus.NotReceived, // not yet

        receivedId: msg.receivedId,
        receivedName: channel.channelName,
        receivedPic: channel.avatar,
        receivedStatus: Status.INACTIF, // not matter

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
        const receivedUser = await this.prisma.user.findUnique({ where: { id: msg.receivedId } });
        const temp: messageDto = {
          isDirectMsg: true,

          senderId: msg.senderId,
          senderName: senderUser.nickname,
          senderPic: senderUser.profilePic,

          contentMsg: msg.content,
          createdAt: msg.createdAt,
          messageStatus: msg.messageStatus,

          receivedId: msg.receivedId,
          receivedName: receivedUser.nickname,
          receivedPic: receivedUser.profilePic,
          receivedStatus: receivedUser.status
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
        const temp: messageDto = {
          isDirectMsg: false,
=======
        messageStatus: msg.messageStatus,

        receivedId: msg.receivedId,
        receivedName: receivedUser.nickname,
        receivedPic: receivedUser.profilePic,
        receivedStatus: receivedUser.status,

        OwnerChannelId: '', // no matter
        isChannProtected: false // no matter

      }
      if (notSendTo === "")
        server.to(msg.receivedId).emit('findMsg2UsersResponse', temp);
      server.to(msg.senderId).emit('findMsg2UsersResponse', temp);
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
>>>>>>> origin/lhoussin

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
<<<<<<< HEAD
        }
        return temp;
      })
    )
    return result;
  }

  async getLastMessages(senderId: string, receivedId: string) {
=======

          OwnerChannelId: channel.channelOwnerId,
          isChannProtected: channel.protected


        }
        server.to(member.userId).emit('findMsg2UsersResponse', temp);
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

            OwnerChannelId: '', // no matter
            isChannProtected: false // no matter



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

                OwnerChannelId: channel.channelOwnerId,
                isChannProtected: channel.protected


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

>>>>>>> origin/lhoussin
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
<<<<<<< HEAD
  }

  async getChannleForMsg(senderId: string) {
    let result: messageDto[] = [];
    let myChannel: Channel[] = [];

    const channelMembers = await this.prisma.channelMember.findMany({
=======

  }

  async getChannleForMsg(senderId: string) {

    let result: messageDto[] = [];
    let myChannels: Channel[] = [];

    const channelMembers: ChannelMember[] = await this.prisma.channelMember.findMany({
>>>>>>> origin/lhoussin
      where: {
        userId: senderId
      }
    });
    for (const ch of channelMembers) {
      const channel: Channel = await this.prisma.channel.findUnique({ where: { id: ch.channelId } });
<<<<<<< HEAD
      myChannel.push(channel);
    }

    for (const channel of myChannel) {
=======
      myChannels.push(channel);
    }

    for (const channel of myChannels) {
>>>>>>> origin/lhoussin
      const lastMessageChannel: Message = await this.prisma.message.findFirst({
        where: {
          isDirectMessage: false,
          channelId: channel.id,
        },
        orderBy: {
          createdAt: "desc",
        },
<<<<<<< HEAD

      });
      const userSender = await this.prisma.user.findUnique({ where: { id: lastMessageChannel.senderId } });
      const temp: messageDto = {
        isDirectMsg: false,
=======
      });
      const userSender = await this.prisma.user.findUnique({ where: { id: lastMessageChannel.senderId } });
      const temp: messageDto = {
        isDirectMessage: false,

        InfoMessage: false,
>>>>>>> origin/lhoussin

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
<<<<<<< HEAD
=======

        OwnerChannelId: channel.channelOwnerId,
        isChannProtected: channel.protected

>>>>>>> origin/lhoussin
      }
      result.push(temp);

    }
<<<<<<< HEAD
    return result;
  }


  async getMessageForList(senderId: string) {
    let resultDirect: messageDto[] = [];
    const resultChannel = await this.getChannleForMsg(senderId);
    const userToUersMsg = await this.prisma.message.findMany({
      where: {
        OR: [{ senderId: senderId, isDirectMessage: true },
        { receivedId: senderId, isDirectMessage: true }],
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
      const tmp: messageDto = {
        isDirectMsg: true,

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
=======

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
      if (find) continue;
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

        OwnerChannelId: chl.channelOwnerId,
        isChannProtected: chl.protected
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
          OR: [{ senderId: senderId, isDirectMessage: true },
          { receivedId: senderId, isDirectMessage: true }],
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

          OwnerChannelId: '', // no matter
          isChannProtected: false // no matter
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

          OwnerChannelId: '', // no matter
          isChannProtected: false // no matter
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
      console.log("error = ", error);
      return { error: true }
    }
>>>>>>> origin/lhoussin
  }
}
