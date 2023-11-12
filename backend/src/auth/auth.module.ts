import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
<<<<<<< HEAD
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
=======
import { JwtModule } from '@nestjs/jwt';
import { FortyTwoIntranetStrategy } from './42-intranet.strategy';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { MessagesService } from 'src/messages/messages.service';
import { ChannelService } from 'src/channel/channel.service';
import { SocketGatewayService } from 'src/socket/socket.service';

@Module({
  imports: [
    PassportModule,
    JwtModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, FortyTwoIntranetStrategy,
    MessagesService, PrismaService, UserService,
    ChannelService,
    SocketGatewayService
  ],
})

export class AuthModule { }
>>>>>>> implement the sockets successfully
