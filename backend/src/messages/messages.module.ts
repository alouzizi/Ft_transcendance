import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
<<<<<<< HEAD
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessageController } from './messages.controller';

@Module({
  controllers: [MessageController],
  providers: [MessagesGateway, PrismaService, UserService, MessagesService],
=======
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessageController } from './messages.controller';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  controllers: [MessageController],
  providers: [PrismaService, UserService, MessagesService, ChannelService],
>>>>>>> implement the sockets successfully
  exports: [MessagesService]
})
export class MessagesModule { }


