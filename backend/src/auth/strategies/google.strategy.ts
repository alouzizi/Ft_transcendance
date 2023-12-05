import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { UserService } from "src/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: "571358523842-a0ngiv1cug62c8uo69s7ri9re1vp1tc9.apps.googleusercontent.com",//process.env.GOOGLE_CLIENT_ID,
            clientSecret: "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",//process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:4000/auth/stategies/callback', // Replace with your actual redirect URL
            scope: ['email', 'profile'],
        });
    }

    validateUser(profile: Profile) {
        const { sub, given_name, family_name, picture, email } = profile._json;
        const user = {
            intra_id: typeof sub === "string" ? sub : sub.toString(),
            email: email,
            first_name: given_name,
            last_name: family_name,
            profilePicture: picture,
            login42: family_name,
        };
        return user;
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
        try {
            const user = await this.validateUser(profile);

            let checkuser = await this.userService.findByIntraId(user.intra_id);
            if (checkuser) {
                done(null, checkuser);
            } else {
                let createnewuser = await this.userService.createUserForGoogle(user);
                done(null, createnewuser);
            }
            return user;
        } catch (error) {
            done(error, false);
        }
    }
}

// //check in database if user exists if yes add index in front of login42 and recheckit again with recursion
// function checkifUserExists(user: { intra_id: any; email: any; first_name: any; last_name: any; profilePicture: any; login42: any; }) {

// }

