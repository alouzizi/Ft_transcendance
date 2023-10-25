import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/UserService';
@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async validateUser(username: string, password: string) {}
  //   const userExists = await this.usersService.doesUserExistByUsername(username);
  
  //   if (userExists) {
  //     const user = await this.usersService.findByUsername(username);
  //     // Rest of your authentication logic
  //   } else {
  //     throw new UnauthorizedException('User not found');
  //   }
  // }
  return this.authservice.validateUser(req.user);
}