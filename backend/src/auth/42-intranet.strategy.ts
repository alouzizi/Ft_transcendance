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
                clientID: 'u-s4t2ud-0d34f697f052538e1e04d6afced1b035cc7095a5e265512e511b21a76552c238',
                clientSecret: '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',
                callbackURL: 'http://localhost:4000/auth/42-intranet/callback',
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