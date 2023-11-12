import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './users/user.service';

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, 
      // Use your actual JWT secret here
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.email);

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    if (!user.isTwoFactorAuthenticationEnabled || payload.isTwoFactorAuthenticated) {
      return user;
    }

    throw new UnauthorizedException('2FA authentication required');
  }
}
