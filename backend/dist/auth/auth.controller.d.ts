import { Response } from "express";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginWith42(): Promise<void>;
    callbackWith42(req: any, res: Response): Promise<void>;
}
