import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }


  // @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  // @UseGuards(JwtGuard)
  @Get('/all')
  async getAllUser() {
    return await this.userService.findAllUsers();
  }


  @Get('/getValideUsers/:id')
  async getValideUsers(@Param('id') senderId: string) {
    return await this.userService.getValideUsers(senderId);
  }


  @Get('/getUserForMsg/:id')
  async getUserForMsg(@Param('id') senderId: string) {
    return await this.userService.getUserForMsg(senderId);
  }


  @Get('getUserGeust/:id')
  async getUserGeust(@Param('id') id: string) {
    return await this.userService.getUserGeust(id);
  }

  @Get('getChannelGeust/:id')
  async getChannelGeust(@Param('id') id: string) {
    return await this.userService.getChannelGeust(id);
  }
} 
