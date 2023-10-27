import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/UserService';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-42';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UserService,
    ) {}
  async validateUser(profile: Profile){
    const user = await this.validateUser(profile.intra_id);

    if (!user) {
      throw new UnauthorizedException('User not found');

    }
    // If the user is found, generate an access token
    const accessToken = this.generateAccessToken(user);
    
    return {
      access_token: accessToken,
      user: user, // You can customize this based on your user model
    };
  }

  generateAccessToken(user: any): string {
    // Create a JWT access token based on the user's data
    const payload = { sub: user.intra_id, username: user.username }; // Customize the payload as needed
    return this.jwtService.sign(payload);
  }
}