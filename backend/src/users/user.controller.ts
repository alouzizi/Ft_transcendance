import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Res, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './UserService';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('42-intranet'))
  @Get('42-intranet/login')
  async loginWith42(@Res() res) {
    // Assuming you have access to the authenticated user's information,
    // you can check if the user is in the database.
    
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}