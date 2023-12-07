import { Profile } from 'passport-google-oauth20';
import { UserService } from "src/user/user.service";
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validateUser(profile: Profile): {
        intra_id: any;
        email: any;
        first_name: any;
        last_name: any;
        profilePicture: any;
        login42: any;
    };
    validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<{
        intra_id: any;
        email: any;
        first_name: any;
        last_name: any;
        profilePicture: any;
        login42: any;
    }>;
}
export {};
