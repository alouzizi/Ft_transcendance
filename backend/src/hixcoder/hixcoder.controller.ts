import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { HixcoderService } from "./hixcoder.service";

@Controller("hixcoder")
export class HixcoderController {
  constructor(private hixcoderService: HixcoderService) {}

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
}
