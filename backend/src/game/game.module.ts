import { Module } from "@nestjs/common";
import { FriendshipService } from "src/friendship/friendship.service";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { NotificationService } from "src/notification/notification.service";

@Module({
  controllers: [GameController],
  providers: [GameService, FriendshipService, NotificationService],
})
export class GameModule { }
