import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { MessagesModule } from "./messages/messages.module";
import { FriendshipModule } from "./friendship/friendship.module";
import { HixcoderController } from "./hixcoder/hixcoder.controller";
import { HixcoderModule } from "./hixcoder/hixcoder.module";

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MessagesModule,
    FriendshipModule,
    HixcoderModule,
  ],
})
export class AppModule {}
