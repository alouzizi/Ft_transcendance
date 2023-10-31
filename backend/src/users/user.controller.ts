import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './UserService';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService) {}

  @UseGuards(AuthGuard('42-intranet'))
  @Get('42-intranet/login')
  async loginWith42() {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
