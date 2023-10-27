import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Res} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './UserService';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly JwtService: JwtService

  ) {}

  @UseGuards(AuthGuard('42-intranet'))
  @Get('42-intranet/login')
  async loginWith42(@Res() res) {
    // Assuming you have access to the authenticated user's information,
    // you can check if the user is in the database.
    
  }
  @Post('signup')
  async signUp(@Body() user: { username: string; password: string }) {
    return this.userService.signUp(user.username, user.password);
  }

  @Post('signin')
  async signIn(@Body() user: { username: string; password: string }) {
    return this.userService.signIn(user.username, user.password);
  }
  // @Post()
  // async createUser(@Body() createUserDto: any) {
  //   return this.userService.createUser(createUserDto);
  // }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Assuming createUserDto contains the user data
    // Call the service to create a user
    const newUser = await this.userService.createUser(createUserDto);
    return newUser;
  }
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
