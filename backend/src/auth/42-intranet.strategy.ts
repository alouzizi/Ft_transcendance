import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, VerifyCallback } from "passport-42";
import { UserService } from "src/user/user.service";
// import { UserService } from 'src/users/UserService';

@Injectable({})
export class FortyTwoIntranetStrategy extends PassportStrategy(
  Strategy,
  "42-intranet"
) {
  constructor(private userService: UserService) {
    super({
      clientID:
        "u-s4t2ud-095667cbde991cad25d4c4725b163ae40cf962fe82422ff3d685da013e33f830",
      clientSecret:
        "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",
      callbackURL: "http://10.12.2.12:4000/auth/42-intranet/callback",
      scope: ["public"],
    });
  }

  validateUser(profile: Profile) {
    // refreshToken: string
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
    //accessToken: string,refreshToken: string
    try {
      const user = await this.validateUser(profile);
      let checkuser = await this.userService.findByIntraId(user.intra_id);
      console.log("checkuser--------> ", checkuser);
      if (checkuser) {
        // checkuser = await this.userService.findByIntraId(user.intra_id);
        done(null, user);
      } else {
        console.log("here");
        let createnewuser = await this.userService.createUser(user);
        done(null, createnewuser);
        console.log("createnewuser--------> ", createnewuser);
        // throw new UnprocessableEntityException('Validation failed');
      }
      return user;
    } catch (error) {
      done(error, false);
    }
  }
}
