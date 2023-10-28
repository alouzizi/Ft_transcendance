import { Module } from '@nestjs/common';
import { UserService } from './UserService';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AuthService } from 'src/auth/auth.service';

@Module({
imports:[],
  providers: [UserService,AuthService,PrismaService,JwtService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
