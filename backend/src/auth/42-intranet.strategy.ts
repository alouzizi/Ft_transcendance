import { Injectable, UnprocessableEntityException} from '@nestjs/common';
import { PassportStrategy  } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/UserService';

@Injectable()
export class FortyTwoIntranetStrategy extends PassportStrategy(Strategy, '42-intranet') {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {
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
     validateUser(profile: Profile){ //accessToken: string, refreshToken: string
      console.log('profile', profile);
      const { id, username,first_name, last_name, image,wallet,cursus_users,login } = profile._json
		              const user = {
                        // intra_id : id.tostring(),
                        intra_id: typeof id === 'string' ? id : id.toString(),
			                  username: username,
			                  email: profile['emails'][0]['value'],
			                  password: username,
                        first_name: first_name,
                        last_name: last_name,
                        profilePicture: image.link,
                        wallet: wallet,
                        level: cursus_users[1].level,
			                  grade: cursus_users[1].grade,
			                  login42: login,
                        // accessToken
                  };
                  return user;
      }
      async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback){
        try { 
          const user = await this.validateUser(profile);
          let checkuser = await this.userService.findByIntraId(user.intra_id);

          if(checkuser){
            // const createNewUser = await this.authService.signup(user);
            checkuser = await this.userService.findByIntraId(user.intra_id);
            done (null, user);
          } else {
            let createuser = await this.userService.createUser(user.intra_id);
            done(null, createuser);
            // throw new UnprocessableEntityException('Validation failed');
          }
        } catch (error){
          done( error, false);
        }
      }
      // console.log(profile);
      // return this.authService.validateUser(user)
      // return profile;
}