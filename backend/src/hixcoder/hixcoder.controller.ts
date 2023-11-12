import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { HixcoderService } from "./hixcoder.service";

@Controller("hixcoder")
export class HixcoderController {
  constructor(private hixcoderService: HixcoderService) {}

  // ==========================  Gets ==========================

  // for get all users
  @Get("/allUsers/:sender")
  async getallUsers(@Param("sender") sender: string) {
    return this.hixcoderService.getAllUsers(sender);
  }

  // for get one user
  @Get("/oneUser/:recieverUsr")
  async getOneUser(@Param("recieverUsr") reciever: string) {
    return this.hixcoderService.getOneUser(reciever);
  }

  // for is Bolcked
  @Get("/isBlocked/:sender/:reciever")
  async getIsBlocked(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.hixcoderService.getIsBlocked(sender, reciever);
  }

  // for get all online friends
  @Get("/onlineFriends/:sender")
  async getOnlineFriends(@Param("sender") sender: string) {
    return this.hixcoderService.getOnlineFriends(sender);
  }

  // for get all friends
  @Get("/allFriends/:sender")
  async getAllFriends(@Param("sender") sender: string) {
    return this.hixcoderService.getAllFriends(sender);
  }

  // for get pending friends
  @Get("/pendingFriends/:sender")
  async getPendingFriends(@Param("sender") sender: string) {
    return this.hixcoderService.getPendingFriends(sender);
  }

  // for get blocked friends
  @Get("/blockedFriends/:sender")
  async getBlockedFriends(@Param("sender") sender: string) {
    return this.hixcoderService.getBlockedFriends(sender);
  }

  // for get allPossibleFriends
  @Get("/allPossibleFriends/:sender")
  async getAllPossibleFriends(@Param("sender") sender: string) {
    return this.hixcoderService.getAllPossibleFriends(sender);
  }

  // for get navSearchUsers
  @Get("/navSearchUsers/:sender")
  async getNavSearchUsers(@Param("sender") sender: string) {
    return this.hixcoderService.getNavSearchUsers(sender);
  }

  // ==========================  Posts ==========================

  // for send friend request
  @Post("/sendFriendRequest/:sender/:reciever")
  async sendFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.hixcoderService.sendFriendRequest(sender, reciever);
  }

  // for accept Friend Request
  @Post("/acceptFriendRequest/:sender/:reciever")
  async acceptFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.hixcoderService.acceptFriendRequest(sender, reciever);
  }

  // for unsend friend request
  @Post("/unsendFriendRequest/:sender/:reciever")
  async unsendFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.hixcoderService.unsendFriendRequest(sender, reciever);
  }

  // for reject Friend Request
  @Post("/rejectFriendRequest/:sender/:reciever")
  async rejectFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.hixcoderService.rejectFriendRequest(sender, reciever);
  }

  // for block friend
  @Post("/blockFriend/:sender/:reciever")
  async blockFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.hixcoderService.blockFriend(sender, reciever);
  }

  // for unblock friend
  @Post("/unblockFriend/:sender/:reciever")
  async unblockFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.hixcoderService.unblockFriend(sender, reciever);
  }

  // for remove friend
  @Post("/removeFriend/:sender/:reciever")
  async removeFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.hixcoderService.removeFriend(sender, reciever);
  }

  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================  Game Gets ==========================
  // for get gameHistory
  @Get("/gameHistory/:senderUsr")
  async getGameHistory(@Param("senderUsr") sender: string) {
    console.log("Received request for game history for sender:", sender);
    return this.hixcoderService.getGameHistory(sender);
  }
  // for get globalInfos for acheivments making
  @Get("/globalInfos/:recieverUsr")
  async getGlobalInfos(@Param("recieverUsr") recieverUsr: string) {
    return this.hixcoderService.getGlobalInfos(recieverUsr);
  }

  // for getUserRanking
  @Get("/userRanking/:senderUsr")
  async getUserRanking(@Param("senderUsr") senderUsr: string) {
    return this.hixcoderService.getUserRanking(senderUsr);
  }

  // ==========================  Game Posts =========================

  // for updateLevel
  @Post("/updateLevel/:senderUsr/:newLevel")
  async updateLevel(
    @Param("senderUsr") sender: string,
    @Param("newLevel") newLevel: string
  ) {
    return this.hixcoderService.updateLevel(sender, newLevel);
  }
  // for updateGameHistory
  @Post("/updateGameHistory/:senderUsr/:recieverUsr/:senderPt/:recieverPt")
  async updateGameHistory(
    @Param("senderUsr") senderUsr: string,
    @Param("recieverUsr") recieverUsr: string,
    @Param("senderPt") senderPt: string,
    @Param("recieverPt") recieverPt: string
  ) {
    return this.hixcoderService.updateGameHistory(
      senderUsr,
      recieverUsr,
      senderPt,
      recieverPt
    );
  }
}
