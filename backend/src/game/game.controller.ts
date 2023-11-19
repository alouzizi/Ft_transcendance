import { Controller, Get, Param, Post } from "@nestjs/common";
import { GameService } from "./game.service";
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";

// @UseGuards(JwtGuard)
@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  // ==========================  Game Gets ==========================
  // for get gameHistory
  @Get("/gameHistory/:senderId")
  @UseGuards(JwtGuard)
  async getGameHistory(@Param("senderId") sender: string) {
    return this.gameService.getGameHistory(sender);
  }
  // for get globalInfos for acheivments making
  @Get("/globalInfos/:recieverId")
  async getGlobalInfos(@Param("recieverId") recieverId: string) {
    return this.gameService.getGlobalInfos(recieverId);
  }

  // for getUserRanking
  @Get("/userRanking/:senderUsr")
  async getUserRanking(@Param("senderUsr") recieverId: string) {
    return this.gameService.getUserRanking(recieverId);
  }

  // for getUserRanking
  @Get("/LeaderBoard/")
  async getLeaderBoard() {
    return this.gameService.getLeaderBoard();
  }

  // ==========================  Game Posts =========================

  // for updateLevel
  @Post("/updateLevel/:senderUsr/:newLevel")
  async updateLevel(
    @Param("senderUsr") sender: string,
    @Param("newLevel") newLevel: string
  ) {
    return this.gameService.updateLevel(sender, newLevel);
  }
  // for updateGameHistory
  @Post("/updateGameHistory/:senderUsr/:recieverUsr/:senderPt/:recieverPt")
  async updateGameHistory(
    @Param("senderUsr") senderUsr: string,
    @Param("recieverUsr") recieverUsr: string,
    @Param("senderPt") senderPt: string,
    @Param("recieverPt") recieverPt: string
  ) {
    return this.gameService.updateGameHistory(
      senderUsr,
      recieverUsr,
      senderPt,
      recieverPt
    );
  }
}
