import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { UserService } from 'src/user/user.service';
// import { UserService } from 'src/users/UserService';

@Injectable({})

export class FortyTwoIntranetStrategy extends PassportStrategy(Strategy, '42-intranet') {

    constructor(private userService: UserService) {
        super(
            {
                clientID: process.env.FORTYTWO_CLIENT_ID,
                clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
                scope: ['public'],
            });
    }

    validateUser(profile: Profile) { // refreshToken: string
        const { id, first_name, last_name, image, login } = profile._json
        const user = {
            intra_id: typeof id === 'string' ? id : id.toString(),
            email: profile['emails'][0]['value'],
            first_name: first_name,
            last_name: last_name,
            profilePicture: image.link,
            login42: login,
        };
        return user;
    }

    async validate(accessToken: String, refreshToken: string, profile: Profile, done: VerifyCallback) {
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