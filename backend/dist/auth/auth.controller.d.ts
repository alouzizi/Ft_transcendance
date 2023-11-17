import { Response } from 'express';
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    loginWith42(req: any): Promise<void>;
    register(req: any): Promise<any>;
    turnOnTwoFactorAuthentication(intra_id: string, authCode: string): Promise<boolean>;
    authenticate(res: Response, intra_id: string, authCode: string): Promise<boolean>;
    callbackWith42(req: any, res: Response): Promise<void>;
}
