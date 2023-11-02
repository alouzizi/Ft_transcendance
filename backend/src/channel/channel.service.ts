import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
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


  async findChannelById(id: string) {
    return await this.prisma.channel.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getMembersChannel(id: string) {
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
    return (result);
  }

}
