<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service'; 
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule} from '@nestjs/jwt';
=======
// import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { JwtModule } from '@nestjs/jwt';
// import { FortyTwoIntranetStrategy } from './42-intranet.strategy';
// import { PassportModule } from '@nestjs/passport';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { UserService } from 'src/user/user.service';
// import { MessagesService } from 'src/messages/messages.service';
// import { ChannelService } from 'src/channel/channel.service';
// import { SocketGatewayService } from 'src/socket/socket.service';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule,
//   ],

//   controllers: [AuthController],
//   providers: [AuthService, FortyTwoIntranetStrategy,
//     MessagesService, PrismaService, UserService,
//     ChannelService,
//     SocketGatewayService
//   ],
// })

// export class AuthModule { }


import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
>>>>>>> origin/lhoussin
import { PassportModule } from '@nestjs/passport';
import { FortyTwoIntranetStrategy } from './42-intranet.strategy';
import { MessagesService } from 'src/messages/messages.service';
import { ChannelService } from 'src/channel/channel.service';
<<<<<<< HEAD
import { Jwt2faStrategy } from './2FA/jwt-2fa.strategy';

@Module({
  imports:[
=======
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
>>>>>>> origin/lhoussin
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" }
    }),
  ],
  controllers: [AuthController],
<<<<<<< HEAD
  providers: [AuthService,FortyTwoIntranetStrategy,Jwt2faStrategy,
    UserService,PrismaService,ChannelService,MessagesService, ], 
})

export class AuthModule {}
=======

  providers: [AuthService, FortyTwoIntranetStrategy,
    UserService, PrismaService, ChannelService, MessagesService,],
})

export class AuthModule { }
>>>>>>> origin/lhoussin
