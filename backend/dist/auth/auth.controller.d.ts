import { Response } from 'express';
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    loginWith42(req: any): Promise<{
        email: any;
        access_token: string;
    }>;
    register(req: any): Promise<any>;
    turnOnTwoFactorAuthentication(req: any, authCode: string): Promise<true>;
    authenticate(req: any, authCode: string): Promise<boolean>;
    callbackWith42(req: any, res: Response): Promise<void>;
}
