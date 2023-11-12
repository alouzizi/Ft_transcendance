import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { MessagesModule } from "./messages/messages.module";
import { FriendshipModule } from "./friendship/friendship.module";
<<<<<<< HEAD
import { HixcoderController } from "./hixcoder/hixcoder.controller";
import { HixcoderModule } from "./hixcoder/hixcoder.module";

=======
import { ChannelModule } from './channel/channel.module';
import { SocketGatewayModule } from "./socket/socket.module";
import { HixcoderModule } from "./hixcoder/hixcoder.module";



>>>>>>> implement the sockets successfully
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MessagesModule,
    FriendshipModule,
<<<<<<< HEAD
    HixcoderModule,
  ],
})
export class AppModule {}
=======
    ChannelModule,
    SocketGatewayModule,
    HixcoderModule,
  ],
})
export class AppModule { }
>>>>>>> implement the sockets successfully
