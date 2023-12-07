import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { MessagesService } from "src/messages/messages.service";
import { ChannelService } from "src/channel/channel.service";
import { UserService } from "src/user/user.service";
import { NotificationService } from "src/notification/notification.service";
import { FortyTwoIntranetStrategy } from "./strategies/42-intranet.strategy";
import { GoogleStrategy } from "./strategies/google.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],

  providers: [
    AuthService,
    FortyTwoIntranetStrategy,
    GoogleStrategy,
    UserService,
    PrismaService,
    ChannelService,
    MessagesService,
    NotificationService
  ],
})
export class AuthModule { }
