import { Injectable, UnprocessableEntityException} from '@nestjs/common';
import { PassportStrategy  } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { UserService } from 'src/users/user.service';

@Injectable()
export class FortyTwoIntranetStrategy extends PassportStrategy(Strategy, '42-intranet') {
  constructor(private readonly UserService: UserService) {
    super(
      {
        // authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
        // tokenURL: 'https://api.intra.42.fr/oauth/authorize',
        clientID: process.env.FORTYTWO_CLIENT_ID,
        clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/auth/42-intranet/callback',
        scope: ['public'],
      });
    }
     validateUser( profile: Profile){ // refreshToken: string
      const { id,first_name,last_name,image,wallet,cursus_users,login } = profile._json
		              const user = {
                        intra_id: typeof id === 'string' ? id : id.toString(),
			                  email: profile['emails'][0]['value'],
                        first_name: first_name,
                        last_name: last_name,
                        profilePicture: image.link,
                        wallet: wallet,
                        level: cursus_users[1].level,
			                  grade: cursus_users[1].grade,
			                  login42: login,
                  };
                  console.log(user);
                  return user;
      }
      async validate( accessToken: String, refreshToken: string,profile: Profile, done: VerifyCallback){  //accessToken: string,refreshToken: string
        try { 
          console.log('profile', profile);
          const user = await this.validateUser(profile);
          let checkuser = await this.UserService.findByIntraId(user.intra_id);
          console.log(checkuser);
          if(checkuser){
            // checkuser = await this.userService.findByIntraId(user.intra_id);
            done (null, user);
          } else {
          console.log("here")
            let createnewuser = await this.UserService.createUser(user);
            done(null, createnewuser);
            // throw new UnprocessableEntityException('Validation failed');
          }
          return user
        } catch (error){
          done( error, false);
        }
      } 
}