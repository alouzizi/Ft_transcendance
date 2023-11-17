import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
<<<<<<< HEAD
import { UserModule } from "./users/user.module";
import { MessagesModule } from "./messages/messages.module";
import { FriendshipModule } from "./friendship/friendship.module";
import { ChannelModule } from './channel/channel.module';
=======
import { UserModule } from "./user/user.module";
import { MessagesModule } from "./messages/messages.module";
import { FriendshipModule } from "./friendship/friendship.module";
import { ChannelModule } from './channel/channel.module';
import { SocketGatewayModule } from "./socket/socket.module";
import { HixcoderModule } from "./hixcoder/hixcoder.module";
>>>>>>> origin/lhoussin



@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MessagesModule,
    FriendshipModule,
    ChannelModule,
<<<<<<< HEAD
=======
    SocketGatewayModule,
    HixcoderModule,
>>>>>>> origin/lhoussin
  ],
})
export class AppModule { }
