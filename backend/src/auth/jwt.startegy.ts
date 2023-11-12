import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Prisma } from '@prisma/client';
import { Request } from "express";
import { Strategy} from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        config: ConfigService,
        private prisma: PrismaService,
    ) {
        super({
            jwtFromRequest: JwtStrategy.extractJWT,
            secretOrKey: process.env.JWT_SERCRET,
        });
    }
    private static extractJWT(req: Request): string | null {
        if (
            req.cookies &&
            req.cookies.access_token &&
            req.cookies.access_token.length > 0
        ) {
          return req.cookies.access_token;
        }
        return null;
    }
    async validate(payload: any) {
        const user = await this.prisma.user.findUnique({
            where: {
                nickname: payload.sub,
            },
        });
        return user;
    }
}
