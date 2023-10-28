import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { UserService } from 'src/user/user.service';
// import { UserService } from 'src/users/UserService';

@Injectable({})

export class FortyTwoIntranetStrategy extends PassportStrategy(Strategy, '42-intranet') {

    constructor(config: ConfigService,) {

        super(
            {
                clientID: 'u-s4t2ud-7527be8cdb9352288351be959fdbe96d939875e2c2b8cb6f649886e3b5799f4c',
                clientSecret: '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',
                callbackURL: 'http://localhost:4000/auth/42-intranet/callback',
                scope: ['public'],
            });
    }


    async validate(accessToken: String, refreshToken: string, profile: Profile, done: VerifyCallback) {  //accessToken: string,refreshToken: string
        console.log(" ---- FortyTwoIntranetStrategy called", profile);
        // try {
        //     console.log('profile', profile);
        //     // const user = await this.validateUser(profile);
        //     // let checkuser = await this.userService.findByIntraId(user.intra_id);
        //     // console.log(checkuser);
        //     // if (checkuser) {
        //     //     // checkuser = await this.userService.findByIntraId(user.intra_id);
        //     //     done(null, user);
        //     // } else {
        //     //     console.log("here")
        //     //     let createnewuser = await this.userService.createUser(user);
        //     //     done(null, createnewuser);
        //     //     // throw new UnprocessableEntityException('Validation failed');
        //     // }
        //     // return user
        // } catch (error) {
        //     done(error, false);
        // }
        return 'success';
    }



    validateUser(profile: Profile) { // refreshToken: string
        const { id, first_name, last_name, image, wallet, cursus_users, login } = profile._json
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
}