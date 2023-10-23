import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
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
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            hash: string;
            firstName: string;
            lastName: string;
        };
        access_token: string;
        refresh_token: string;
    }>;
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
        access_token: string;
        refresh_token: string;
    }>;
    signToken(user: User): Promise<{
        user: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            hash: string;
            firstName: string;
            lastName: string;
        };
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(user: User): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
