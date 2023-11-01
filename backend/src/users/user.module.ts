import { Module } from '@nestjs/common';
import { UserService } from './UserService';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';
import { ChannelService } from 'src/channel/channel.service';

@Module({
imports:[],
  providers: [
    UserService,AuthService,PrismaService,
    JwtService,ChannelService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
