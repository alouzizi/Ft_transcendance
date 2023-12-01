import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessageController } from './messages.controller';
import { ChannelService } from 'src/channel/channel.service';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [MessageController],
  providers: [PrismaService, UserService, MessagesService, ChannelService, NotificationService],
  exports: [MessagesService]
})
export class MessagesModule { }


