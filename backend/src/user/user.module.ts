import { Module } from '@nestjs/common';
import { UserService } from './UserService';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, PrismaService, JwtService],
  controllers: [UserController],
})
export class UserModule {}
