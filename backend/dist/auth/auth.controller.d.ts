import { Response } from 'express';
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    loginWith42(req: any): Promise<void>;
    register(req: any): Promise<any>;
    turnOffTwoFactorAuthentication(intra_id: string): Promise<void>;
    turnOnTwoFactorAuthentication(res: Response, intra_id: string, authCode: string): Promise<void>;
    authenticate(res: Response, intra_id: string, authCode: string): Promise<void>;
    callbackWith42(req: any, res: Response): Promise<void>;
}
