import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, nickname: string): Promise<Partial<User>> {
    const userWithoutPsw = await this.authService.validateUser(email, nickname);
    if (!userWithoutPsw) {
      throw new UnauthorizedException();
    }
    return userWithoutPsw;
  }
}