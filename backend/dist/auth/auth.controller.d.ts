import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signin(dto: AuthDto): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            hash: string;
            firstName: string;
            lastName: string;
        };
        backendTokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    signup(dto: AuthDto): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            hash: string;
            firstName: string;
            lastName: string;
        };
        backendTokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
    refreshToken(req: any): Promise<{
        backendTokens: {
            access_token: string;
            refresh_token: string;
        };
    }>;
}
