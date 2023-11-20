import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { FriendshipService } from "./friendship.service";
import { JwtGuard } from "src/auth/guard";

// @UseGuards(JwtGuard)
@Controller("friendship")
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) { }

  // ====================== LHOUSSAIN ENDPOINTS ======================
  // @Get("/getSendFriendRequest/:sender")
  // async getSendRequistFriends(@Param("sender") sender: string) {
  //   return await this.friendshipService.getSendRequistFriends(sender);
  // }

  // @Get("/getRecivedRequistFriends/:sender")
  // async getRecivedRequistFriends(@Param("sender") sender: string) {
  //   return await this.friendshipService.getRecivedRequistFriends(sender);
  // }

  // @Get("/getFriends/:sender")
  // async getFriends(@Param("sender") sender: string) {
  //   return await this.friendshipService.getFriends(sender);
  // }

  // @Get("/getBlockedUser/:sender")
  // async getBlockedUser(@Param("sender") sender: string) {
  //   return await this.friendshipService.getBlockedUser(sender);
  // }

  // @Post("/sendFriendRequest/:sender/:recived")
  // async addFriendRequest(
  //   @Param("sender") sender: string,
  //   @Param("recived") recived: string
  // ) {
  //   return await this.friendshipService.sendFriendRequist(sender, recived);
  // }

  // @Delete("/removeFriendRequest/:sender/:recived")
  // async removeFriendRequest(
  //   @Param("sender") sender: string,
  //   @Param("recived") recived: string
  // ) {
  //   return await this.friendshipService.removeFriendRequist(sender, recived);
  // }

  // @Post("/accepteFriendRequest/:sender/:recived")
  // async accepteFriendRequest(
  //   @Param("sender") sender: string,
  //   @Param("recived") recived: string
  // ) {
  //   await this.friendshipService.removeFriendRequist(recived, sender); // need to check
  //   return await this.friendshipService.accepteFriendRequest(sender, recived);
  // }

  // @Delete("/deleteFriend/:sender/:recived")
  // async deleteFriend(
  //   @Param("sender") sender: string,
  //   @Param("recived") recived: string
  // ) {
  //   return await this.friendshipService.deleteFriend(sender, recived);
  // }

  // @Post("/blockedUser/:sender/:recived")
  // async blockedUser(
  //   @Param("sender") sender: string,
  //   @Param("recived") recived: string
  // ) {
  //   await this.friendshipService.removeFriendRequist(recived, sender);
  //   await this.friendshipService.deleteFriend(recived, sender);
  //   return await this.friendshipService.blockedUser(sender, recived);
  // }

  @Delete("/unBlockedUser/:sender/:recived")
  @UseGuards(JwtGuard)
  async unBlockedUser(
    @Param("sender") sender: string,
    @Param("recived") recived: string
  ) {
    return await this.friendshipService.unBlockedUser_2(sender, recived);
  }

  // ============================================ ****************** ============================================
  // ============================================ ****************** ============================================
  // ============================================ ****************** ============================================
  // ============================================ ****************** ============================================
  // ============================================ ****************** ============================================
  // ============================================ HIXCODER ENDPOINTS ============================================
  // ============================================ ****************** ============================================
  // ============================================ ****************** ============================================
  // ============================================ ****************** ============================================
  // ============================================ ****************** ============================================
  // ============================================ ****************** ============================================

  // ==========================  Gets ==========================

  // for get all users
  @Get("/allUsers/:sender")
  async getallUsers(@Param("sender") sender: string) {
    return this.friendshipService.getAllUsers(sender);
  }

  // for get one user
  @Get("/getUserByNick/:recieverUsr")
  async getUserByNick(@Param("recieverUsr") reciever: string) {
    return this.friendshipService.getUserByNick(reciever);
  }

  // for is Bolcked
  @Get("/isBlocked/:sender/:reciever")
  async getIsBlocked(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.getIsBlocked(sender, reciever);
  }

  // for get all online friends
  @Get("/onlineFriends/:sender")
  async getOnlineFriends(@Param("sender") sender: string) {
    return this.friendshipService.getOnlineFriends(sender);
  }

  // for get all friends
  @Get("/allFriends/:sender")
  async getAllFriends(@Param("sender") sender: string) {
    return this.friendshipService.getAllFriends(sender);
  }

  // for get pending friends
  @Get("/pendingFriends/:sender")
  async getPendingFriends(@Param("sender") sender: string) {
    return this.friendshipService.getPendingFriends(sender);
  }

  // for get blocked friends
  @Get("/blockedFriends/:sender")
  async getBlockedFriends(@Param("sender") sender: string) {
    return this.friendshipService.getBlockedFriends(sender);
  }

  // for get allPossibleFriends
  @Get("/allPossibleFriends/:sender")
  async getAllPossibleFriends(@Param("sender") sender: string) {
    return this.friendshipService.getAllPossibleFriends(sender);
  }

  // for get navSearchUsers
  @Get("/navSearchUsers/:sender")
  async getNavSearchUsers(@Param("sender") sender: string) {
    return this.friendshipService.getNavSearchUsers(sender);
  }

  // ==========================  Posts ==========================

  // for send friend request
  @Post("/sendFriendRequest/:sender/:reciever")
  async sendFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.sendFriendRequest(sender, reciever);
  }

  // for accept Friend Request
  @Post("/acceptFriendRequest/:sender/:reciever")
  async acceptFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.acceptFriendRequest(sender, reciever);
  }

  // for unsend friend request
  @Post("/unsendFriendRequest/:sender/:reciever")
  async unsendFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.unsendFriendRequest(sender, reciever);
  }

  // for reject Friend Request
  @Post("/rejectFriendRequest/:sender/:reciever")
  async rejectFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.rejectFriendRequest(sender, reciever);
  }

  // for block friend
  @Post("/blockFriend/:sender/:reciever")
  async blockFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.blockFriend(sender, reciever);
  }

  // for unblock friend
  @Post("/unblockFriend/:sender/:reciever")
  async unblockFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.unblockFriend(sender, reciever);
  }

  // for remove friend
  @Post("/removeFriend/:sender/:reciever")
  async removeFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.removeFriend(sender, reciever);
  }
}
