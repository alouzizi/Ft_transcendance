import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
import { AuthService } from 'src/auth/auth.service';
import { ChannelService } from 'src/channel/channel.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [UserService, PrismaService, JwtService, AuthService, ChannelService],
  controllers: [UserController],
  imports: [
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 1024 * 1024, // 1 MB limit (adjust as needed)
      },
    }),
  ]
})
export class UserModule { }
