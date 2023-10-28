import { ConfigService } from '@nestjs/config/dist/config.service';
import { Profile, VerifyCallback } from 'passport-42';
declare const FortyTwoIntranetStrategy_base: new (...args: any[]) => any;
export declare class FortyTwoIntranetStrategy extends FortyTwoIntranetStrategy_base {
    constructor(config: ConfigService);
    validate(accessToken: String, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<string>;
    validateUser(profile: Profile): {
        intra_id: any;
        email: Profile;
        first_name: any;
        last_name: any;
        profilePicture: any;
        wallet: any;
        level: any;
        grade: any;
        login42: any;
    };
}
export {};
