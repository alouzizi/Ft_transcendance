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
  @Get("/oneUser/:recieverUsername")
  async getOneUser(@Param("recieverUsername") userName: string) {
    return this.hixcoderService.getOneUser(userName);
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

  // for get blocked friends
  @Get("/allPossibleFriends/:sender")
  async getAllPossibleFriends(@Param("sender") sender: string) {
    return this.hixcoderService.getAllPossibleFriends(sender);
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
}
