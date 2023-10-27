import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/UserService'; 
import { PrismaService } from 'src/prisma.service';
import { JwtService, JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoIntranetStrategy } from './42-intranet.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,FortyTwoIntranetStrategy,UserService,PrismaService,JwtService],
})
export class AuthModule {}
