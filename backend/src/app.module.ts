import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { MessagesModule } from "./messages/messages.module";
import { FriendshipModule } from "./friendship/friendship.module";
import { ChannelModule } from './channel/channel.module';
import { SocketGatewayModule } from "./socket/socket.module";



@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MessagesModule,
    FriendshipModule,
    ChannelModule,
    SocketGatewayModule
  ],
})
export class AppModule { }
