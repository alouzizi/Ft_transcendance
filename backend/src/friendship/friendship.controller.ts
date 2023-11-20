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
  @UseGuards(JwtGuard)
  async getallUsers(@Param("sender") sender: string) {
    return this.friendshipService.getAllUsers(sender);
  }

  // for get one user
  @Get("/getUserByNick/:recieverUsr")
   @UseGuards(JwtGuard)
async getUserByNick(@Param("recieverUsr") reciever: string) {
    return this.friendshipService.getUserByNick(reciever);
  }

  // for is Bolcked
  @Get("/isBlocked/:sender/:reciever")
   @UseGuards(JwtGuard)
   async getIsBlocked(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.getIsBlocked(sender, reciever);
  }

  // for get all online friends
  @Get("/onlineFriends/:sender")
   @UseGuards(JwtGuard)
   async getOnlineFriends(@Param("sender") sender: string) {
    return this.friendshipService.getOnlineFriends(sender);
  }

  // for get all friends
  @Get("/allFriends/:sender")
   @UseGuards(JwtGuard)
   async getAllFriends(@Param("sender") sender: string) {
    return this.friendshipService.getAllFriends(sender);
  }

  // for get pending friends
  @Get("/pendingFriends/:sender")
   @UseGuards(JwtGuard)
   async getPendingFriends(@Param("sender") sender: string) {
    return this.friendshipService.getPendingFriends(sender);
  }

  // for get blocked friends
  @Get("/blockedFriends/:sender")
   @UseGuards(JwtGuard)
   async getBlockedFriends(@Param("sender") sender: string) {
    return this.friendshipService.getBlockedFriends(sender);
  }

  // for get allPossibleFriends
  @Get("/allPossibleFriends/:sender")
   @UseGuards(JwtGuard)
   async getAllPossibleFriends(@Param("sender") sender: string) {
    return this.friendshipService.getAllPossibleFriends(sender);
  }

  // for get navSearchUsers
  @Get("/navSearchUsers/:sender")
   @UseGuards(JwtGuard)
   async getNavSearchUsers(@Param("sender") sender: string) {
    return this.friendshipService.getNavSearchUsers(sender);
  }

  // ==========================  Posts ==========================

  // for send friend request
  @Post("/sendFriendRequest/:sender/:reciever")
   @UseGuards(JwtGuard)
   async sendFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.sendFriendRequest(sender, reciever);
  }

  // for accept Friend Request
  @Post("/acceptFriendRequest/:sender/:reciever")
   @UseGuards(JwtGuard)
   async acceptFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.acceptFriendRequest(sender, reciever);
  }

  // for unsend friend request
  @Post("/unsendFriendRequest/:sender/:reciever")
   @UseGuards(JwtGuard)
   async unsendFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.unsendFriendRequest(sender, reciever);
  }

  // for reject Friend Request
  @Post("/rejectFriendRequest/:sender/:reciever")
   @UseGuards(JwtGuard)
   async rejectFriendRequest(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.rejectFriendRequest(sender, reciever);
  }

  // for block friend
  @Post("/blockFriend/:sender/:reciever")
   @UseGuards(JwtGuard)
   async blockFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.blockFriend(sender, reciever);
  }

  // for unblock friend
  @Post("/unblockFriend/:sender/:reciever")
  @UseGuards(JwtGuard)
  async unblockFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.unblockFriend(sender, reciever);
  }

  // for remove friend
  @Post("/removeFriend/:sender/:reciever")
   @UseGuards(JwtGuard)
   async removeFriend(
    @Param("sender") sender: string,
    @Param("reciever") reciever: string
  ) {
    return this.friendshipService.removeFriend(sender, reciever);
  }
}
