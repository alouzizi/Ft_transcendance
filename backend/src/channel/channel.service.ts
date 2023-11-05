import { Injectable } from '@nestjs/common';
import { BannedMember, ChannelMember, KickedMember, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto, memberChannelDto } from './dto/create-channel.dto';




@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async createChannel(createChannelDto: CreateChannelDto, senderId: string) {
    try {
      const newChannel = await this.prisma.channel.create({
        data: {
          channelOwnerId: senderId,
          channelName: createChannelDto.channleName,
          channelPassword: createChannelDto.channlePassword,
          channelType: createChannelDto.channelType,
          avatar: "https://randomuser.me/api/portraits/women/82.jpg"
        }
      })
      // add Owner
      await this.prisma.channelMember.create({
        data: {
          userId: senderId,
          isAdmin: true,
          channelId: newChannel.id,
        }
      })
      await this.prisma.message.create({
        data: {
          senderId: senderId,
          receivedId: newChannel.id,
          content: "create group",
          isDirectMessage: false,
          InfoMessage: true,
          channelId: newChannel.id,
        }
      });
      createChannelDto.channelMember.forEach(async (item: string) => {
        const userAdd: User = await this.prisma.user.findUnique({ where: { id: item } });
        await this.prisma.channelMember.create({
          data: {
            userId: item,
            isAdmin: false,
            channelId: newChannel.id,
          }
        });
        await this.prisma.message.create({
          data: {
            senderId: senderId,
            receivedId: newChannel.id,
            content: `added ${userAdd.nickname}`,
            isDirectMessage: false,
            InfoMessage: true,
            channelId: newChannel.id,
          }
        });
      });
      return newChannel;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return { status: 202, error: 'Name is already used' };

        } else {
          console.error('Prisma error:', error);
        }
      }
    }
  }

  async addUserToChannel(senderId: string, channelId: string, userId: string) {
    const admin: ChannelMember = await this.prisma.channelMember.findUnique({
      where: {
        Unique_userId_channelId: { channelId, userId: senderId }
      },
    })
    if (admin.isAdmin) {
      await this.prisma.channelMember.create({
        data: {
          userId: userId,
          isAdmin: false,
          channelId: channelId,
        }
      })
    }
  }



  async getChannel(senderId: string, channelId: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });
    return {
      channleName: channel.channelName,
      channelType: channel.channelType,
      protected: (channel.channelPassword === '') ? false : true,
      channlePassword: '8888',
      avatar: channel.avatar,
      channelOwnerId: channel.channelOwnerId
    }
  }


  async findChannelById(id: string) {
    return await this.prisma.channel.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getMembersBanned(id: string) {
    let result: memberChannelDto[] = [];
    const members = await this.prisma.bannedMember.findMany({ where: { channelId: id } });
    for (const member of members) {
      const user: User = await this.prisma.user.findUnique({ where: { id: member.userId } })
      const temp = {
        userId: member.userId,
        nickname: user.nickname,
        profilePic: user.profilePic,
        status: 'banned'
      }
      result.push(temp);
    }
    result.sort((a: memberChannelDto, b: memberChannelDto) => {
      return a.nickname.localeCompare(b.nickname);
    });
    return (result);
  }

  async getRegularMembers(id: string) {
    let result: memberChannelDto[] = [];
    const channel = await this.prisma.channel.findUnique({ where: { id } });
    const members = await this.prisma.channelMember.findMany({ where: { channelId: id } });
    for (const member of members) {
      const user: User = await this.prisma.user.findUnique({ where: { id: member.userId } })
      const temp = {
        userId: member.userId,
        nickname: user.nickname,
        profilePic: user.profilePic,
        status: (member.userId === channel.channelOwnerId) ? "Owner"
          : (member.isAdmin ? 'Admin' : 'User')
      }
      result.push(temp);
    }
    result.sort((a: memberChannelDto, b: memberChannelDto) => {
      return a.nickname.localeCompare(b.nickname);
    });
    return (result);
  }

  async getMembersChannel(id: string) {
    const bannedMembers: memberChannelDto[] = await this.getMembersBanned(id);
    const regularMembres: memberChannelDto[] = await this.getRegularMembers(id);
    return { bannedMembers, regularMembres };
  }

  async changeStatusAdmin(senderId: string, channelId: string, userId: string) {
    const admin: ChannelMember = await this.prisma.channelMember.findUnique({
      where: {
        Unique_userId_channelId: { channelId, userId: senderId }
      },
    })
    const user: ChannelMember = await this.prisma.channelMember.findUnique({
      where: {
        Unique_userId_channelId: { channelId, userId }
      },
    })
    if (admin.isAdmin) {
      const update: ChannelMember = await this.prisma.channelMember.update({
        where: {
          Unique_userId_channelId: { channelId, userId }
        },
        data: {
          isAdmin: !user.isAdmin,
        },
      },
      )
      return true;
    }
    return false;
  }

  async KickMember(senderId: string, channelId: string, userId: string) {
    const admin: ChannelMember = await this.prisma.channelMember.findUnique({
      where: {
        Unique_userId_channelId: { channelId, userId: senderId }
      },
    })
    if (admin.isAdmin) {
      await this.prisma.kickedMember.create({
        data: { channelId, userId }
      });
      await this.prisma.channelMember.delete({
        where: { Unique_userId_channelId: { channelId, userId } }
      });
      return true;
    }
    return false;
  }

  async changeStatutsBanned(senderId: string, channelId: string, userId: string) {
    const admin: ChannelMember = await this.prisma.channelMember.findUnique({
      where: {
        Unique_userId_channelId: { channelId, userId: senderId }
      },
    })
    if (admin.isAdmin) {
      const isEXIST = await this.prisma.bannedMember.findUnique({
        where: { Unique_userId_channelId: { channelId, userId } },
      })
      if (isEXIST) {
        await this.prisma.bannedMember.delete({
          where: { Unique_userId_channelId: { channelId, userId } }
        });
      } else {
        await this.prisma.bannedMember.create({
          data: { userId, channelId }
        });
        await this.prisma.channelMember.delete({
          where: { Unique_userId_channelId: { channelId, userId } }
        });
      }
      return true;
    }
    return false;
  }
}
