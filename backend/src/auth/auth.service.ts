import { Injectable } from '@nestjs/common';
// import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  // Implement your authentication logic here
  async validateUser(user: any) {
    // Validate the user and return the user object if valid
    // You can use your own logic and database queries here
    return user;
  }
}