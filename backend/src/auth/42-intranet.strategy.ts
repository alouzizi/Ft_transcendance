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
                clientID: 'u-s4t2ud-7527be8cdb9352288351be959fdbe96d939875e2c2b8cb6f649886e3b5799f4c',
                clientSecret: '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',
                callbackURL: 'http://10.12.13.5:4000/auth/42-intranet/callback',
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

    async validate(accessToken: String, refreshToken: string, profile: Profile, done: VerifyCallback) {  //accessToken: string,refreshToken: string
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