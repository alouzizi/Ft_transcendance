import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway";
import { SocketGatewayService } from "./socket.service";
import { MessagesService } from "src/messages/messages.service";
import { UserService } from "src/user/user.service";
import { ChannelService } from "src/channel/channel.service";
import { PongServise } from "src/game/game.service";
import { HixcoderService } from "src/hixcoder/hixcoder.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [
    SocketGateway,
    SocketGatewayService,
    MessagesService,
    UserService,
    ChannelService,
    PongServise,
    HixcoderService,
    PrismaService,
  ],
})
export class SocketGatewayModule {}
