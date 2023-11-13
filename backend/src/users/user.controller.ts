import {
  Controller, 
  Get,
  Req,
  Post, 
  Body, 
  Param, 
  Delete, 
  Put, 
  UseGuards, 
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  //houssin ----------
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.userService.findById(id);
  }


  @UseGuards(JwtGuard)
  @Get('/intra/:id_intra')
  async getUserByIdintr(@Param('id_intra') id_intra: string) {
    const user = await this.userService.findByIntraId(id_intra);
    const temp = {
      id: user.id,
      intra_id: user.intra_id,
      first_name: user.first_name,
      last_name: user.last_name,
      nickname: user.nickname,
      profilePic: user.profilePic,
    }
    return temp;
  }

  @Get('/all')
  async getAllUser() {
    return await this.userService.findAllUsers();
  }
  @Get('/getValideUsers/:id')
  async getValideUsers(@Param('id') senderId: string) {
    return await this.userService.getValideUsers(senderId);
  }
  // @Get('getUserGeust/:id')
  // async getUserGeust(@Param('id') id: string) {
  //   return await this.userService.getUserGeust(id);
  // }
  @Get('getChannelGeust/:id')
  async getChannelGeust(@Param('id') id: string) {
    return await this.userService.getChannelGeust(id);
  }
  @UseGuards(AuthGuard('42-intranet'))
  @Get('42-intranet/login')
  async loginWith42(@Req() req) {

  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

}
//get user profil: take token verify jwt find user and return user 
