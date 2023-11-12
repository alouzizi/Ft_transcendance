<<<<<<< HEAD
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(dto: AuthDto): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
            hash: string;
            avatar: string;
            status: import(".prisma/client").$Enums.Status;
            lastSee: Date;
        };
        backendTokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number;
        };
    }>;
    signup(dto: AuthDto): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
            hash: string;
            avatar: string;
            status: import(".prisma/client").$Enums.Status;
            lastSee: Date;
        };
        backendTokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number;
        };
    }>;
    refreshToken(req: any): Promise<{
        backendTokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number;
        };
    }>;
=======
import { Response } from 'express';
import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginWith42(): Promise<void>;
    callbackWith42(req: any, res: Response): Promise<void>;
>>>>>>> implement the sockets successfully
}
