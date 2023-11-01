import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/UserService';
import { MessageController } from './messages.controller';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  controllers: [MessageController],
  providers: [MessagesGateway, PrismaService, UserService, MessagesService, ChannelService],
  exports: [MessagesService]
})
export class MessagesModule { }
