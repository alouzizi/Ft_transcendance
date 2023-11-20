import { Controller, Get, Param, Post } from "@nestjs/common";
import { GameService } from "./game.service";
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";

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
   @UseGuards(JwtGuard)
   async getGlobalInfos(@Param("recieverId") recieverId: string) {
    return this.gameService.getGlobalInfos(recieverId);
  }

  // for getUserRanking
  @Get("/userRanking/:senderId")
   @UseGuards(JwtGuard)
   async getUserRanking(@Param("senderId") recieverId: string) {
    return this.gameService.getUserRanking(recieverId);
  }

  // for getUserRanking
  @Get("/LeaderBoard/")
   @UseGuards(JwtGuard)
   async getLeaderBoard() {
    return this.gameService.getLeaderBoard();
  }

  // ==========================  Game Posts =========================

  // for updateLevel
  @Post("/updateLevel/:senderId/:newLevel")
   @UseGuards(JwtGuard)
   async updateLevel(
    @Param("senderId") sender: string,
    @Param("newLevel") newLevel: string
  ) {
    return this.gameService.updateLevel(sender, newLevel);
  }
  // for updateGameHistory
  @Post("/updateGameHistory/:senderId/:recieverId/:senderPt/:recieverPt")
   @UseGuards(JwtGuard)
   async updateGameHistory(
    @Param("senderId") senderId: string,
    @Param("recieverId") recieverId: string,
    @Param("senderPt") senderPt: string,
    @Param("recieverPt") recieverPt: string
  ) {
    return this.gameService.updateGameHistory(
      senderId,
      recieverId,
      senderPt,
      recieverPt
    );
  }
}
