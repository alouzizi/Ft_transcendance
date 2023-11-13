import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/users/user.service';
import { MessageController } from './messages.controller';
import { ChannelService } from 'src/channel/channel.service';
import { UserModule } from 'src/users/user.module';

@Module({
  imports:[UserModule,],
  controllers: [MessageController],
  providers: [MessagesGateway,PrismaService,
    MessagesService,ChannelService,UserService],
  exports: [MessagesService]
})
export class MessagesModule {}
