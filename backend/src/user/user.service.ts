import { Injectable, } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { MessagesService } from "src/messages/messages.service";
import { MessageItemList } from "./dto/user.dto";
import { Channel, Message, Status } from "@prisma/client";
import { ChannelService } from "src/channel/channel.service";


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private messagesService: MessagesService,
    private channelService: ChannelService,
  ) { }


  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }


  async getValideUsers(senderId: string) {
    const users = await this.prisma.user.findMany();

    const blockerUsers = await this.prisma.blockedUser.findMany({
      where: {
        OR: [{ senderId: senderId }, { receivedId: senderId }],
      },
    });

    const temp = users.filter((user) => {
      if (user.id === senderId) return false;
      const found = blockerUsers.find((elm) => {
        return (
          (senderId === elm.senderId && user.id === elm.receivedId) ||
          (senderId === elm.receivedId && user.id === elm.senderId)
        );
      });
      if (found) return false;
      return true;
    });

    const result = await Promise.all(
      temp.map(async (user) => {
        let friends = await this.prisma.friend.findFirst({
          where: {
            OR: [
              {
                senderId: senderId,
                receivedId: user.id,
              },
              {
                senderId: user.id,
                receivedId: senderId,
              },
            ],
          },
        });
        if (friends) return { ...user, friendship: 1 }; // friends
        let freiReq = await this.prisma.friendRequest.findFirst({
          where: {
            senderId: user.id,
            receivedId: senderId,
          },
        });
        if (freiReq) return { ...user, friendship: 2 }; //  user that I sent a friend request
        let sendReq = await this.prisma.friendRequest.findFirst({
          where: {
            senderId: senderId,
            receivedId: user.id,
          },
        });
        if (sendReq) return { ...user, friendship: 3 };  // user who sent a friend request 
        return { ...user, friendship: 0 }; // user
      })
    );
    return result;
  }

  async getChannleForMsg(senderId: string) {
    let result: MessageItemList[] = [];
    let myChannel: Channel[] = [];
    const channelMembers = await this.prisma.channelMember.findMany({
      where: {
        userId: senderId
      }
    });
    for (const ch of channelMembers) {
      const channel = await this.prisma.channel.findUnique({ where: { id: ch.channelId } });
      myChannel.push(channel);
    }
    for (const channel of myChannel) {
      const lastMessageChannel = await this.prisma.message.findFirst({
        where: {
          isDirectMessage: false,
          channelId: channel.id,
        },
        orderBy: {
          createdAt: "desc",
        },

      });

      if (lastMessageChannel) {
        const temp: MessageItemList = {
          isDirectMsg: false,
          id: channel.id,
          name: channel.channelName,
          avatar: channel.avatar,
          status: Status.INACTIF,
          lastMsg: lastMessageChannel.content,
          createdAt: lastMessageChannel.createdAt
        }
        result.push(temp);
      }
    }
    return result;
  }

  async getUserForMsg(senderId: string) {
    let resultDirect: MessageItemList[] = [];
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
    let usersMsgList: any = [];
    for (const id of idUsersArray) {
      const user = await this.prisma.user.findUnique({ where: { id } })
      usersMsgList.push(user);
    }

    let lastMsgs: Message[] = [];
    for (let i = 0; i < usersMsgList.length; i++) {
      const temp = await this.messagesService.getLastMessages(
        senderId,
        usersMsgList[i].id
      );
      lastMsgs.push(temp);
    }
    for (let i = 0; i < usersMsgList.length; i++) {
      const temp: MessageItemList = {
        isDirectMsg: true,
        id: usersMsgList[i].id,

        name: usersMsgList[i].nickname,
        avatar: usersMsgList[i].profilePic,
        status: usersMsgList[i].status,

        lastMsg: lastMsgs[i].content,
        createdAt: lastMsgs[i].createdAt
      }
      resultDirect.push(temp);
    }
    const result = [...resultDirect, ...resultChannel]

    result.sort((a: MessageItemList, b: MessageItemList) => {
      const myDate1 = new Date(a.createdAt);
      const myDate2 = new Date(b.createdAt);
      return myDate2.getTime() - myDate1.getTime();
    });


    return result;
  }



  async getUserGeust(id: string) {
    const user = await this.findById(id);
    return {
      isUser: true,
      id: user.id,
      nickname: user.nickname,
      profilePic: user.profilePic,
      status: user.status,
      lastSee: user.lastSee,
      lenUser: 0,
      lenUserLive: 0,
    };
  }


  async getChannelGeust(id: string) {
    const channel = await this.channelService.findChannelById(id);
    return {
      isUser: false,
      id: channel.id,
      nickname: channel.channelName,
      profilePic: channel.avatar,
      status: Status,
      lastSee: channel.createdAt,
      lenUser: 0,
      lenUserLive: 0,
    };
  }

  // saliha -------------------

  async createUser(user1: any) {
    console.log("my user iss", user1.intra_id);
    const user = await this.prisma.user.create({
      data: {
        intra_id: user1.intra_id.toString(),
        nickname: user1.login42.toString(),
        email: user1.email.toString(),
        profilePic: user1.profilePicture.toString(),
        last_name: user1.last_name,
        first_name: user1.first_name
      },

    });
    console.log("prisma user is ", user)
    return user;
  }

  async findByIntraId(intra_id: string) {
    return this.prisma.user.findUnique({
      where: { intra_id: intra_id },
    });
  }

}
