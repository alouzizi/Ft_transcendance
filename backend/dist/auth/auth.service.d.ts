import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private prisma;
    private config;
    private userService;
    private jwtService;
    constructor(prisma: PrismaService, config: ConfigService, userService: UserService, jwtService: JwtService);
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
    signToken(user: User): Promise<{
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
    refreshToken(user: User): Promise<{
        backendTokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number;
        };
    }>;
    generateAccessToken(user: any): Promise<{
        access_token: string;
    }>;
    valiadteUserAndCreateJWT(user: User): Promise<{
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
}
