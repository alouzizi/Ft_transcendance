import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service'; 
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoIntranetStrategy } from './42-intranet.strategy';
import { MessagesService } from 'src/messages/messages.service';
import { ChannelService } from 'src/channel/channel.service';
import { Jwt2faStrategy } from './2FA/jwt-2fa.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,FortyTwoIntranetStrategy,Jwt2faStrategy,
    UserService,PrismaService,ChannelService,MessagesService, ], 
})

export class AuthModule {}
