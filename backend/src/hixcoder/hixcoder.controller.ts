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
    const senderId = parseInt(sender);
    return this.hixcoderService.getAllUsers(senderId);
  }

  // for get all online friends
  @Get("/onlineFriends/:sender")
  async getOnlineFriends(@Param("sender") sender: string) {
    const senderId = parseInt(sender);
    return this.hixcoderService.getOnlineFriends(senderId);
  }

  // for get all friends
  @Get("/allFriends/:sender")
  async getAllFriends(@Param("sender") sender: string) {
    const senderId = parseInt(sender);
    return this.hixcoderService.getAllFriends(senderId);
  }

  // for get pending friends
  @Get("/pendingFriends/:sender")
  async getPendingFriends(@Param("sender") sender: string) {
    const senderId = parseInt(sender);
    return this.hixcoderService.getPendingFriends(senderId);
  }

  // for get blocked friends
  @Get("/blockedFriends/:sender")
  async getBlockedFriends(@Param("sender") sender: string) {
    const senderId = parseInt(sender);
    return this.hixcoderService.getBlockedFriends(senderId);
  }

  // for get blocked friends
  @Get("/allPossibleFriends/:sender")
  async getAllPossibleFriends(@Param("sender") sender: string) {
    const senderId = parseInt(sender);
    return this.hixcoderService.getAllPossibleFriends(senderId);
  }

  // ==========================  Posts ==========================

  // for send friend request
  @Post("/sendFriendRequest/:sender/:reciever")
  async sendFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    const senderId = parseInt(sender);
    const recieverId = parseInt(reciever);
    return this.hixcoderService.sendFriendRequest(senderId, recieverId);
  }

  // for accept Friend Request
  @Post("/acceptFriendRequest/:sender/:reciever")
  async acceptFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    const senderId = parseInt(sender);
    const recieverId = parseInt(reciever);
    return this.hixcoderService.acceptFriendRequest(senderId, recieverId);
  }

  // for unsend friend request
  @Post("/unsendFriendRequest/:sender/:reciever")
  async unsendFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    const senderId = parseInt(sender);
    const recieverId = parseInt(reciever);
    return this.hixcoderService.unsendFriendRequest(senderId, recieverId);
  }

  // for reject Friend Request
  @Post("/rejectFriendRequest/:sender/:reciever")
  async rejectFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    const senderId = parseInt(sender);
    const recieverId = parseInt(reciever);
    return this.hixcoderService.rejectFriendRequest(senderId, recieverId);
  }

  // for block friend
  @Post("/blockFriend/:sender/:reciever")
  async blockFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    const senderId = parseInt(sender);
    const recieverId = parseInt(reciever);
    return this.hixcoderService.blockFriend(senderId, recieverId);
  }

  // for unblock friend
  @Post("/unblockFriend/:sender/:reciever")
  async unblockFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    const senderId = parseInt(sender);
    const recieverId = parseInt(reciever);
    return this.hixcoderService.unblockFriend(senderId, recieverId);
  }

  // for remove friend
  @Post("/removeFriend/:sender/:reciever")
  async removeFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    const senderId = parseInt(sender);
    const recieverId = parseInt(reciever);
    return this.hixcoderService.removeFriend(senderId, recieverId);
  }
}
