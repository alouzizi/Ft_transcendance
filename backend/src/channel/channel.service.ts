import { Injectable } from '@nestjs/common';
import { BannedMember, Channel, ChannelMember, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto, memberChannelDto } from './dto/create-channel.dto';




@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
  ) { }


  async createMessageInfoChannel(senderId: string, channelId: string, userId: string, msg: string) {
    const user: User = await this.prisma.user.findUnique({ where: { id: userId } })
    await this.prisma.message.create({
      data: {
        senderId: senderId,
        receivedId: channelId,
        content: (user) ? `${msg} ${user.nickname}` : `${msg}`,
        isDirectMessage: false,
        InfoMessage: true,
        channelId: channelId,

      }
    });
  }

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
      this.createMessageInfoChannel(senderId, newChannel.id, '', 'create group');
      // add Owner
      await this.prisma.channelMember.create({
        data: {
          userId: senderId,
          isAdmin: true,
          channelId: newChannel.id,
        }
      })
      // add members
      createChannelDto.channelMember.forEach(async (item: string) => {
        await this.prisma.channelMember.create({
          data: {
            userId: item,
            isAdmin: false,
            channelId: newChannel.id,
          }
        });
        this.createMessageInfoChannel(senderId, newChannel.id, item, 'added');
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
      });
      this.createMessageInfoChannel(senderId, channelId, userId, "added");
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
        role: 'banned',
        status: user.status,
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
        status: user.status,
        role: (member.userId === channel.channelOwnerId) ? "Owner"
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

  async leaveChannel(senderId: string, channelId: string) {
    const channel: Channel = await this.prisma.channel.findUnique({
      where: { id: channelId }
    })
    const members: ChannelMember[] = await this.prisma.channelMember.findMany({
      where: { channelId },
    });
    const user: ChannelMember = await this.prisma.channelMember.findUnique({
      where: {
        Unique_userId_channelId: { channelId, userId: senderId }
      },
    });

    if (user) {
      await this.prisma.channelMember.delete({
        where: { Unique_userId_channelId: { channelId, userId: senderId } }
      });
      this.createMessageInfoChannel(senderId, channelId, '', 'leaved');
      if (members.length === 1) {
        await this.prisma.message.deleteMany({ where: { channelId } });
        await this.prisma.bannedMember.deleteMany({ where: { channelId } });
        await this.prisma.channel.delete({ where: { id: channelId } })
      } else {
        if (channel.channelOwnerId === senderId) {
          let newOwner: ChannelMember = await this.prisma.channelMember.findFirst(
            { where: { channelId, isAdmin: true } })
          if (!newOwner) {
            newOwner = await this.prisma.channelMember.findFirst(
              { where: { channelId } })
          }
          if (newOwner) {
            const user = await this.prisma.user.findUnique({ where: { id: newOwner.userId } })
            await this.prisma.channel.update({
              where: { id: channelId },
              data: {
                channelOwnerId: newOwner.userId
              }
            })
            await this.prisma.channelMember.update({
              where: { Unique_userId_channelId: { channelId, userId: newOwner.userId } },
              data: { isAdmin: true }
            })
          }
        }
      }


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
    const user: ChannelMember = await this.prisma.channelMember.findUnique({
      where: {
        Unique_userId_channelId: { channelId, userId }
      },
    })
    if (admin.isAdmin && user) {
      await this.prisma.channelMember.delete({
        where: { Unique_userId_channelId: { channelId, userId } }
      });
      this.createMessageInfoChannel(senderId, channelId, userId, 'kicked');
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
        this.createMessageInfoChannel(senderId, channelId, userId, 'unbanned');
      } else {
        await this.prisma.bannedMember.create({
          data: { userId, channelId }
        });
        await this.prisma.channelMember.delete({
          where: { Unique_userId_channelId: { channelId, userId } }
        });
        this.createMessageInfoChannel(senderId, channelId, userId, 'banned');
      }
      return true;
    }
    return false;
  }
}
