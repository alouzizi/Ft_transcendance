import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { BlockedUser, Prisma, Status, User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      return { error: true };
    }
  }

  async findAllUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      return { error: true };
    }
  }

  async getValideUsers(senderId: string) {
    try {
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
                { senderId: senderId, receivedId: user.id },
                { senderId: user.id, receivedId: senderId },
              ],
            },
          });
          if (friends) return { ...user, friendship: 1 }; // friends

          let freiReq = await this.prisma.friendRequest.findFirst({
            where: { senderId: user.id, receivedId: senderId },
          });
          if (freiReq) return { ...user, friendship: 2 }; //  user that I sent a friend request

          let sendReq = await this.prisma.friendRequest.findFirst({
            where: { senderId: senderId, receivedId: user.id },
          });
          if (sendReq) return { ...user, friendship: 3 }; // user who sent a friend request

          return { ...user, friendship: 0 }; // user
        })
      );
      return result;
    } catch (error) {
      return { error: true };
    }
  }

  async usersCanJoinChannel(senderId: string, channelId: string) {
    try {
      const users = await this.prisma.user.findMany();
      const blockerUsers = await this.prisma.blockedUser.findMany({
        where: {
          OR: [{ senderId: senderId }, { receivedId: senderId }],
        },
      });
      const bannedUsersChannel = await this.prisma.bannedMember.findMany({
        where: { channelId: channelId },
      });
      const membersChannel = await this.prisma.channelMember.findMany({
        where: { channelId: channelId },
      });

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
          return banned.userId === user.id;
        });
        if (found) return false;
        return true;
      });

      const result = cleanUser2.filter((user) => {
        const found = membersChannel.find((banned) => {
          return banned.userId === user.id;
        });
        if (found) return false;
        return true;
      });
      return result;
    } catch {
      return { error: true };
    }
  }

  // 0 if users is friend
  // 1 if sender block received
  // 2 if receiver block sender
  async checkIsBlocked(senderId: string, receivedId: string) {
    try {
      const block1: BlockedUser = await this.prisma.blockedUser.findFirst({
        where: {
          senderId: senderId,
          receivedId: receivedId,
        },
      });
      if (block1) return 1;
      const block2: BlockedUser = await this.prisma.blockedUser.findFirst({
        where: {
          senderId: receivedId,
          receivedId: senderId,
        },
      });
      if (block2) return 2;
      return 0;
    } catch (error) {
      return { error: true };
    }
  }

  async getUserGeust(id: string) {
    try {
      const user: User = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
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
          inGaming: user.inGaming,
        };
      return {
        isUser: true,
        id: "-1",
        nickname: "",
        profilePic: "",
        status: "",
        lastSee: 0,
        lenUser: 0,
        idUserOwner: 0,
      };
    } catch {
      return { error: true };
    }
  }

  async getChannelGeust(id: string) {
    try {
      const channel = await this.prisma.channel.findUnique({ where: { id } });
      const members = await this.prisma.channelMember.findMany({
        where: { channelId: id },
      });
      return {
        isUser: false,
        id: id,
        nickname: channel.channelName,
        profilePic: channel.avatar,
        status: Status.INACTIF,
        lastSee: channel.createdAt,
        lenUser: members.length,
        idUserOwner: channel.channelOwnerId,
      };
    } catch {
      return { error: true };
    }
  }

  // saliha -------------------

  async createUser(user1: any) {
    try {
      const user = await this.prisma.user.create({
        data: {
          intra_id: user1.intra_id.toString(),
          nickname: user1.login42,
          email: user1.email.toString(),
          profilePic: user1.profilePicture.toString(),
          last_name: user1.last_name,
          first_name: user1.first_name,
          isTwoFactorAuthEnabled: user1.isTwoFactorAuthEnabled || false,
        },
      });
      return user;
    } catch (error) {}
  }

  async setTwoFactorAuthSecret(secret: string, intra_id: string) {
    await this.prisma.user.update({
      where: { intra_id: intra_id },
      data: {
        twoFactorAuthSecret: secret,
      },
    });
  }

  async turnOnTwoFactorAuth(intra_id: string) {
    const user = await this.prisma.user.findUnique({
      where: { intra_id: intra_id },
    });
    await this.prisma.user.update({
      where: { intra_id: intra_id },
      data: {
        isTwoFactorAuthEnabled: true,
      },
    });
  }

  async turnOffTwoFactorAuth(intra_id: string) {
    const user = await this.prisma.user.findUnique({
      where: { intra_id: intra_id },
    });
    await this.prisma.user.update({
      where: { intra_id: intra_id },
      data: {
        isTwoFactorAuthEnabled: false,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async updateNickname(intra_id: string, nickname: string) {
    const usr = await this.prisma.user.findUnique({ where: { intra_id } });
    if (usr.nickname === nickname) {
      return;
    }
    try {
      const user = await this.prisma.user.update({
        where: {
          intra_id: intra_id,
        },
        data: {
          nickname: nickname,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new HttpException("nickname aleady exist", HttpStatus.CONFLICT);
        } else {
          return { status: 202, error: true };
        }
      }
    }
  }

  async uploadImage(intra_id: string, path: string) {
    try {
      await this.prisma.user.update({
        where: {
          intra_id: intra_id,
        },
        data: {
          profilePic: process.env.BACK_HOST + `/${path}`,
        },
      });
    } catch (error) {}
  }

  async findByIntraId(intra_id: string) {
    const user = await this.prisma.user.findUnique({
      where: { intra_id: intra_id },
    });
    return user;
  }

  async findByIds(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({
      where: { id: id },
    });
  }

  async startGameing(senderId: string) {
    await this.prisma.user.update({
      where: { id: senderId },
      data: { inGaming: true },
    });
  }

  async finishGaming(senderId: string) {
    await this.prisma.user.update({
      where: { id: senderId },
      data: { inGaming: false },
    });
  }
}
