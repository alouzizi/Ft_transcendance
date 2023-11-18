import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessageController } from './messages.controller';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  controllers: [MessageController],
  providers: [PrismaService, UserService, MessagesService, ChannelService],
  exports: [MessagesService]
})
export class MessagesModule { }


