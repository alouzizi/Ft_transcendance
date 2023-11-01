// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { FortyTwoIntranetStrategy } from './auth/42-intranet.strategy';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthModule } from './auth/auth.module';
// import { AuthService } from './auth/auth.service';
// import { UserService } from './users/UserService';
// import { PrismaService } from './prisma/prisma.service';
// import { PrismaClient } from '@prisma/client';
// import { ConfigModule } from "@nestjs/config";
// import { UserModule } from "./users/user.module";
// import { MessagesModule } from "./messages/messages.module";
// import { FriendshipModule } from "./friendship/friendship.module";
// import { ChannelModule } from './channel/channel.module';
// @Module({
//   imports: [
//     AuthModule,
//     JwtModule,
//     PassportModule.register({ defaultStrategy: '42-intranet' }),
//   ],
//   providers: [FortyTwoIntranetStrategy,
//     AuthService,UserService,
//     PrismaService,PrismaClient,
//     UserModule,
//     MessagesModule,
//     FriendshipModule,
//     ChannelModule,
//   ],
//   exports: [PassportModule],
// })
// export class AppModule {}


import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./users/user.module";
import { MessagesModule } from "./messages/messages.module";
import { FriendshipModule } from "./friendship/friendship.module";
import { ChannelModule } from './channel/channel.module';



@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MessagesModule,
    FriendshipModule,
    ChannelModule,
  ],
})
export class AppModule { }
