import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { Response } from "express";
export declare class AuthService {
    private prisma;
    private userService;
    private jwtService;
    constructor(prisma: PrismaService, userService: UserService, jwtService: JwtService);
    callbackStratiegs(req: any, res: Response): Promise<void>;
    valiadteUserAndCreateJWT(intra_id: string): Promise<{
        access_token: string;
    }>;
    generateAccessToken(user: User): Promise<{
        access_token: string;
    }>;
    generate2fa_Token(user: any): Promise<string>;
    loginWith2fa(userWithoutPsw: any): Promise<{
        email: any;
        access_token: string;
    }>;
    generateTwoFactorAuthSecret(user: any): Promise<{
        secret: string;
        otpAuthUrl: string;
    }>;
    generateQrCodeDataURL(otpAuthUrl: string): Promise<any>;
    isTwoFactorAuthCodeValid(authCode: string, intra_id: string): Promise<boolean>;
}
