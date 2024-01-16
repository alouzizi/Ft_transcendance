import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { UserService } from "src/user/user.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.CLIENT_ID_GOOGLE,
            clientSecret: process.env.CLIENT_SECRET_GOOGLE,
            callbackURL: process.env.CALLBACK_URL_GOOGLE, // Replace with your actual redirect URL
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
                let createnewuser = await this.userService.createUser(user);
                done(null, createnewuser);
            }
            return user;
        } catch (error) {
            done(error, false);
        }
    }
}

