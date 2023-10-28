import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(dto: AuthDto): Promise<{
        user: {
            id: string;
            intra_id: string;
            first_name: string;
            last_name: string;
            nickname: string;
            email: string;
            profilePic: string;
            hash: string;
            twoFactorAuth: boolean;
            AsciiSecretQr: string;
            createdAt: Date;
            updatedAt: Date;
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
            intra_id: string;
            first_name: string;
            last_name: string;
            nickname: string;
            email: string;
            profilePic: string;
            hash: string;
            twoFactorAuth: boolean;
            AsciiSecretQr: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.Status;
            lastSee: Date;
        };
        backendTokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number;
        };
    }>;
    callbackWith42(req: any, res: Response): Promise<any>;
    refreshToken(req: any): Promise<{
        backendTokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number;
        };
    }>;
}
