import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
<<<<<<< HEAD
import { AuthDto } from "./dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
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
    signToken(user: User): Promise<{
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
    refreshToken(user: User): Promise<{
        backendTokens: {
            access_token: string;
            refresh_token: string;
            expiresIn: number;
        };
=======
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
>>>>>>> implement the sockets successfully
    }>;
}
