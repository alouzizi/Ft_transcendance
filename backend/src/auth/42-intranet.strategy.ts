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
        "u-s4t2ud-a589bfeab5ffa26f8e418a13eea3927ed0581255abeec0cc4e1ff8d3008e54de",
      clientSecret:
        "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",
      callbackURL: "http://localhost:4000/auth/42-intranet/callback",
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
      if (checkuser) {
        // checkuser = await this.userService.findByIntraId(user.intra_id);
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
