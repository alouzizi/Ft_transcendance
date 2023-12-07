import { Request, Response } from "express";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    loginWith42(): Promise<void>;
    googleAuth(): Promise<void>;
    callbackGoogle(req: any, res: Response): Promise<void>;
    callbackIntra42(req: any, res: Response): Promise<void>;
    register(req: Request): Promise<any>;
    turnOnTwoFactorAuthentication(intra_id: string, authCode: string): Promise<boolean>;
    turnOffTwoFactorAuthentication(intra_id: string): Promise<void>;
    authenticate(intra_id: string, authCode: string): Promise<{
        isCodeValid: boolean;
        access_token: string;
    }>;
}
