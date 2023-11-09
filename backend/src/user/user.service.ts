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


  async usersCanJoinChannel(senderId: string, channelId: string) {
    const users = await this.prisma.user.findMany();
    const blockerUsers = await this.prisma.blockedUser.findMany({
      where: {
        OR: [{ senderId: senderId }, { receivedId: senderId }],
      },
    });
    const bannedUsersChannel = await this.prisma.bannedMember.findMany({
      where: { channelId: channelId }
    })
    const membersChannel = await this.prisma.channelMember.findMany({
      where: { channelId: channelId }
    })

    const cleanUser = users.filter((user) => {
      if (user.id === senderId) return false;
      const found = blockerUsers.find((blk) => {
        return (
          (senderId === blk.senderId && user.id === blk.receivedId) ||
          (senderId === blk.receivedId && user.id === blk.senderId)
        );
      });
      if (found) return false;
      return true;
    });

    const cleanUser2 = cleanUser.filter((user) => {
      const found = bannedUsersChannel.find((banned) => {
        return (banned.userId === user.id);
      });
      if (found) return false;
      return true;
    });

    const result = cleanUser2.filter((user) => {
      const found = membersChannel.find((banned) => {
        return (banned.userId === user.id);
      });
      if (found) return false;
      return true;
    });
    return result;
  }


  async getUserGeust(id: string) {
    const user = await this.findById(id);
    if (user)
      return {
        isUser: true,
        id: user.id,
        nickname: user.nickname,
        profilePic: user.profilePic,
        status: user.status,
        lastSee: user.lastSee,
        lenUser: 0,
        idUserOwner: 0,
      };
    return {
      isUser: true,
      id: '-1',
      nickname: '',
      profilePic: '',
      status: '',
      lastSee: 0,
      lenUser: 0,
      idUserOwner: 0,
    };
  }


  async getChannelGeust(id: string) {
    const channel = await this.channelService.findChannelById(id);
    const members = await this.prisma.channelMember.findMany({ where: { channelId: id } });
    return {
      isUser: false,
      id: channel.id,
      nickname: channel.channelName,
      profilePic: channel.avatar,
      status: Status.INACTIF,
      lastSee: channel.createdAt,
      lenUser: members.length,
      idUserOwner: channel.channelOwnerId
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
