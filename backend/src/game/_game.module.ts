import { Module } from "@nestjs/common";
import { MyGateway } from "./_gateway";
import { PongServise } from "./game.service";

@Module({
  providers: [MyGateway, PongServise],
})
export class GameModule {}
