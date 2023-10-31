import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
export declare class AuthService {
    private prisma;
    private config;
    private userService;
    private jwtService;
    constructor(prisma: PrismaService, config: ConfigService, userService: UserService, jwtService: JwtService);
    signToken(user: User): Promise<{
        access_token: string;
        refresh_token: string;
        expiresIn: number;
    }>;
    refreshToken(user: User): Promise<{
        access_token: string;
        refresh_token: string;
        expiresIn: number;
    }>;
    generateAccessToken(user: any): Promise<{
        access_token: string;
    }>;
    valiadteUserAndCreateJWT(user: User): Promise<{
        access_token: string;
        refresh_token: string;
        expiresIn: number;
    }>;
}
