import { Profile, VerifyCallback } from "passport-42";
import { UserService } from "src/user/user.service";
declare const FortyTwoIntranetStrategy_base: new (...args: any[]) => any;
export declare class FortyTwoIntranetStrategy extends FortyTwoIntranetStrategy_base {
    private userService;
    constructor(userService: UserService);
    validateUser(profile: Profile): {
        intra_id: any;
        email: Profile;
        first_name: any;
        last_name: any;
        profilePicture: any;
        login42: any;
    };
    validate(accessToken: String, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<{
        intra_id: any;
        email: Profile;
        first_name: any;
        last_name: any;
        profilePicture: any;
        login42: any;
    }>;
}
export {};
