import { Module } from "@nestjs/common";
import { PongServise } from "./game.service";

@Module({
  providers: [PongServise],
})
export class GameModule {}
