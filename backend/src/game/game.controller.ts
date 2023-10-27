import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";
import { JwtGuard } from "src/auth/guard";
import { HistoryDto } from "./dto";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}
  @UseGuards(JwtGuard)
  @Post("addMatch")
  async addMatch(@Body() match: HistoryDto) {
    return this.gameService.addMatch(match);
  }
}
