import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) { }

  @Get('/getSendFriendRequest/:sender')
  async getSendRequistFriends(@Param('sender') sender: string) {
    const senderId = parseInt(sender);
    return await this.friendshipService.getSendRequistFriends(senderId);
  }

  @Get('/getRecivedRequistFriends/:sender')
  async getRecivedRequistFriends(@Param('sender') sender: string) {
    const senderId = parseInt(sender);
    return await this.friendshipService.getRecivedRequistFriends(senderId);
  }

  @Get('/getFriends/:sender')
  async getFriends(@Param('sender') sender: string) {
    const senderId = parseInt(sender);
    return await this.friendshipService.getFriends(senderId);
  }

  @Get('/getBlockedUser/:sender')
  async getBlockedUser(@Param('sender') sender: string) {
    const senderId = parseInt(sender);
    return await this.friendshipService.getBlockedUser(senderId);
  }

  @Post('/sendFriendRequest/:sender/:recived')
  async addFriendRequest(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    const senderId = parseInt(sender);
    const recivedId = parseInt(recived);
    return await this.friendshipService.sendFriendRequist(senderId, recivedId);
  }

  @Delete('/removeFriendRequest/:sender/:recived')
  async removeFriendRequest(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    const senderId = parseInt(sender);
    const recivedId = parseInt(recived);
    return await this.friendshipService.removeFriendRequist(senderId, recivedId);
  }

  @Post('/accepteFriendRequest/:sender/:recived')
  async accepteFriendRequest(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    const senderId = parseInt(sender);
    const recivedId = parseInt(recived);
    await this.friendshipService.removeFriendRequist(recivedId, senderId);
    return await this.friendshipService.accepteFriendRequest(senderId, recivedId);
  }

  @Delete('/deleteFriend/:sender/:recived')
  async deleteFriend(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    const senderId = parseInt(sender);
    const recivedId = parseInt(recived);
    return await this.friendshipService.deleteFriend(senderId, recivedId);
  }

  @Post('/blockedUser/:sender/:recived')
  async blockedUser(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    const senderId = parseInt(sender);
    const recivedId = parseInt(recived);
    await this.friendshipService.removeFriendRequist(recivedId, senderId);
    await this.friendshipService.deleteFriend(recivedId, senderId);
    return await this.friendshipService.blockedUser(senderId, recivedId);
  }

  @Delete('/unBlockedUser/:sender/:recived')
  async unBlockedUser(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    const senderId = parseInt(sender);
    const recivedId = parseInt(recived);
    return await this.friendshipService.unBlockedUser(senderId, recivedId);
  }
}
