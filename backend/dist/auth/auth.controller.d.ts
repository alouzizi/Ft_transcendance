import { Response } from 'express';
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    loginWith42(req: any): Promise<void>;
    checkTockenIsValide(req: any, intra_id: string): Promise<boolean>;
    register(req: any): Promise<any>;
    turnOffTwoFactorAuthentication(intra_id: string): Promise<void>;
    turnOnTwoFactorAuthentication(res: Response, intra_id: string, authCode: string): Promise<void>;
    authenticate(intra_id: string, authCode: string): Promise<string>;
    callbackWith42(req: any, res: Response): Promise<void>;
}
