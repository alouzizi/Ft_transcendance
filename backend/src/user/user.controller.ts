import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }


  // @UseGuards(JwtGuard)
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
      profilePic: user.profilePic
    }
    return temp;
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
