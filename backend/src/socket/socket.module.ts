import { Module } from "@nestjs/common";
import { SocketGateway } from "./socket.gateway";
import { SocketGatewayService } from "./socket.service";
import { MessagesService } from "src/messages/messages.service";
import { UserService } from "src/user/user.service";
import { ChannelService } from "src/channel/channel.service";
import { GameService } from "src/game/game.service";
import { PrismaService } from "src/prisma/prisma.service";
import { FriendshipController } from "src/friendship/friendship.controller";
import { FriendshipService } from "src/friendship/friendship.service";

@Module({
  providers: [
    SocketGateway,
    SocketGatewayService,
    MessagesService,
    UserService,
    ChannelService,
    GameService,
    FriendshipService,
    PrismaService,
  ],
})
export class SocketGatewayModule {}
