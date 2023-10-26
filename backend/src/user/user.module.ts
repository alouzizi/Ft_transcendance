import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  providers: [UserService, PrismaService, JwtService, MessagesService],
  controllers: [UserController],
  imports: []
})
export class UserModule { }
