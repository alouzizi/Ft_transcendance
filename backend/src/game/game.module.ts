import { Module } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { FriendshipService } from "src/friendship/friendship.service";

@Module({
  controllers: [GameController],
  providers: [GameService, FriendshipService],
})
export class GameModule {}
