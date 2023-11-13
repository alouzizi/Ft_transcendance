import { Module } from "@nestjs/common";
import { MyGateway } from "./gateway";
import { PongServise } from "./game.service";


@Module({
	providers: [MyGateway, PongServise],
})

export class GameModule {}