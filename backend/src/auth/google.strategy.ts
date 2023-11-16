import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';
// import { UserService } from 'src/users/UserService';

@Injectable({})

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private userService: UserService) {
        super(
            {
                clientID: '571358523842-ut46roabf8j6r0k8ajjgleu1o4ditdru.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: 'http://localhost:4000/auth/google/callback',
                scope: ['profile', 'email'],
            });
    }

    validateUser(profile: any) {


        const user = {
            intra_id: profile._json.sub,
            email: profile._json.email,
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            profilePicture: profile._json.picture,
            login42: profile._json.given_name,
        };
        return user;
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {

        try {
            const user = await this.validateUser(profile);
            let checkuser = await this.userService.findByIntraId(user.intra_id);
            if (checkuser) {
                done(null, checkuser);
            } else {
                console.log("here")
                let createnewuser = await this.userService.createUser(user);
                done(null, createnewuser);
            }
            return user
        } catch (error) {
            done(error, false);
        }
    }
}