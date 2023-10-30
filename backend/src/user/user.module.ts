import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
import { AuthService } from 'src/auth/auth.service';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  providers: [UserService, PrismaService, JwtService,
    MessagesService, AuthService, ChannelService],
  controllers: [UserController],
  imports: []
})
export class UserModule { }
