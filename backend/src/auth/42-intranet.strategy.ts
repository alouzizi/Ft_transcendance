import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile} from 'passport-42';
import { AuthService } from './auth.service';
// import { User } from '../user/user.entity';

@Injectable()
export class FortyTwoIntranetStrategy extends PassportStrategy(Strategy, '42-intranet') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
        tokenURL: 'https://api.intra.42.fr/oauth/token',
        clientID: process.env.FORTYTWO_CLIENT_ID,
        clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/42-intranet/callback',
        scope: ['public'],
      });
      }
      async validate(
                    accessToken: string,
                    refreshToken: string,
                    profile: Profile,
          ){
            
                  const { username } = profile
		              const user = {
			                  username: username,
			                  email: profile['emails'][0]['value'],
			                  password: username,
			                  login42: username, 
      }
      return this.authService.validateUser(user)
  }
}