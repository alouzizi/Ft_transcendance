import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile} from 'passport-42';
import { AuthService } from './auth.service';

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
                  const {  id, username, email, first_name, last_name, image,wallet,cursus_users, _json } = profile 
		              const user = {
                        intra_id : profile.id,
			                  username: username,
			                  email: profile['emails'][0]['value'],
			                  password: username,
                        first_name: first_name,
                        last_name: last_name,
                        profilePicture: image.link,
                        wallet: wallet,
                        level: cursus_users[1].level,
			                  grade: cursus_users[1].grade,
			                  // access_token: accessToken,
			                  login42: _json,
      }
      console.log(profile);
      // return this.authService.validateUser(user)
      return profile;
  }
}