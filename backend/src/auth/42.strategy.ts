import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import authConfig from '../config/auth.config';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID: authConfig.clientID,
      clientSecret: authConfig.clientSecret,
      callbackURL: authConfig.callbackURL,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    return profile;
  }
}