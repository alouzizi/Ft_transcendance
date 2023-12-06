import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-42";
import { UserService } from "src/user/user.service";
// import { UserService } from 'src/users/UserService';

@Injectable({})
export class FortyTwoIntranetStrategy extends PassportStrategy(
  Strategy,
  "42-intranet"
) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.CLIENT_ID_42,
      clientSecret: process.env.CLIENT_SECRET_42,
      callbackURL: process.env.CALLBACK_URL_42,
      scope: ['public'],
    });
  }

  validateUser(profile: Profile) {
    const { id, first_name, last_name, image, login } = profile._json;
    const user = {
      intra_id: typeof id === "string" ? id : id.toString(),
      email: profile["emails"][0]["value"],
      first_name: first_name,
      last_name: last_name,
      profilePicture: image.link,
      login42: login,
    };
    return user;
  }

  async validate(
    accessToken: String,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    try {
      const user = await this.validateUser(profile);
      let checkuser = await this.userService.findByIntraId(user.intra_id);
      if (checkuser) {
        done(null, checkuser);
      } else {
        let createnewuser = await this.userService.createUser(user);
        done(null, createnewuser);
      }
      return user;
    } catch (error) {
      done(error, false);
    }
  }
}
