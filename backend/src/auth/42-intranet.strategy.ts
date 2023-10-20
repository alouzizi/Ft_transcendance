import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { AuthService } from './auth.service';

@Injectable()
export class FortyTwoIntranetStrategy extends PassportStrategy(Strategy, '42-intranet') {
  constructor(private readonly authService: AuthService) {
    super({
      authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
      tokenURL: 'https://api.intra.42.fr/oauth/token',
      clientID: process.env.FORTYTWO_CLIENT_ID,
      clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/42-intranet/callback',
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    // Implement user validation based on the profile data from 42 Intranet.
    const user = await this.authService.validateOAuthUser(profile);

    if (!user) {
      done(new Error('Unauthorized'), false);
    }

    done(null, user);
  }
}