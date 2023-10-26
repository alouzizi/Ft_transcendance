import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessageController } from './messages.controller';

@Module({
  controllers: [MessageController],
  providers: [MessagesGateway, PrismaService, UserService, MessagesService],
  exports: [MessagesService]
})
export class MessagesModule { }


