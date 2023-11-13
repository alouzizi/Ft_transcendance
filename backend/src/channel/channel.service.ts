import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { MessagesService } from 'src/messages/messages.service';



@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
  ) {}

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
      await this.prisma.channelMember.create({
        data: {
          userId: senderId,
          isAdmin: false,
          channelId: newChannel.id,
        }
      })
      createChannelDto.channelMember.forEach(async (item: string) => {
        await this.prisma.channelMember.create({
          data: {
            userId: item,
            isAdmin: false,
            channelId: newChannel.id,
          }
        })
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
  findAll() {
    return `This action returns all channel`;
  }
  update(id:string, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }
  remove(id: string) {
    return `This action removes a #${id} channel`;
  }
}
