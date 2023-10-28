import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) { }

  @Get('/getSendFriendRequest/:sender')
  async getSendRequistFriends(@Param('sender') sender: string) {
    return await this.friendshipService.getSendRequistFriends(sender);
  }

  @Get('/getRecivedRequistFriends/:sender')
  async getRecivedRequistFriends(@Param('sender') sender: string) {
    return await this.friendshipService.getRecivedRequistFriends(sender);
  }

  @Get('/getFriends/:sender')
  async getFriends(@Param('sender') sender: string) {
    return await this.friendshipService.getFriends(sender);
  }

  @Get('/getBlockedUser/:sender')
  async getBlockedUser(@Param('sender') sender: string) {
    return await this.friendshipService.getBlockedUser(sender);
  }

  @Post('/sendFriendRequest/:sender/:recived')
  async addFriendRequest(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {

    return await this.friendshipService.sendFriendRequist(sender, recived);
  }

  @Delete('/removeFriendRequest/:sender/:recived')
  async removeFriendRequest(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {

    return await this.friendshipService.removeFriendRequist(sender, recived);
  }

  @Post('/accepteFriendRequest/:sender/:recived')
  async accepteFriendRequest(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    await this.friendshipService.removeFriendRequist(recived, sender); // need to check
    return await this.friendshipService.accepteFriendRequest(sender, recived);
  }

  @Delete('/deleteFriend/:sender/:recived')
  async deleteFriend(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    return await this.friendshipService.deleteFriend(sender, recived);
  }

  @Post('/blockedUser/:sender/:recived')
  async blockedUser(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {

    await this.friendshipService.removeFriendRequist(recived, sender);
    await this.friendshipService.deleteFriend(recived, sender);
    return await this.friendshipService.blockedUser(sender, recived);
  }

  @Delete('/unBlockedUser/:sender/:recived')
  async unBlockedUser(
    @Param('sender') sender: string,
    @Param('recived') recived: string,
  ) {
    return await this.friendshipService.unBlockedUser(sender, recived);
  }
}
