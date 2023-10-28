"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const library_1 = require("@prisma/client/runtime/library");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const EXPIRE_TIME = 20 * 1000;
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        try {
            const intra_id_k = Math.floor(Math.random() * 10000000) + 1;
            const index = Math.floor(Math.random() * 100) + 1;
            const hash = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    intra_id: `${intra_id_k}`,
                    email: dto.email,
                    hash: hash,
                    profilePic: `https://randomuser.me/api/portraits/women/${index}.jpg`,
                    nickname: dto.email,
                },
            });
            return this.signToken(user);
        }
        catch (error) {
            console.log(error);
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credential taken");
                }
            }
            throw error;
        }
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new common_1.ForbiddenException("Credential incorrect");
        }
        const pwMatches = await argon.verify(user.hash, dto.password);
        if (!pwMatches) {
            throw new common_1.ForbiddenException("Credential incorrect");
        }
        return this.signToken(user);
    }
    async signToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
        };
        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: "20s",
            secret: this.config.get("JWT_SECRET"),
        });
        const refresh_token = await this.jwt.signAsync(payload, {
            expiresIn: "7d",
            secret: this.config.get("JWT_RefreshTokenKey"),
        });
        const myUser = user;
        delete myUser.hash;
        return {
            user: myUser,
            backendTokens: {
                access_token: access_token,
                refresh_token: refresh_token,
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            },
        };
    }
    async refreshToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
        };
        const access_token = await this.jwt.signAsync(payload, {
            expiresIn: "20s",
            secret: this.config.get("JWT_SECRET"),
        });
        const refresh_token = await this.jwt.signAsync(payload, {
            expiresIn: "7d",
            secret: this.config.get("JWT_RefreshTokenKey"),
        });
        return {
            backendTokens: {
                access_token: access_token,
                refresh_token: refresh_token,
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            },
        };
    }
    async valiadteUserAndCreateJWT(user) {
        console.log("in validate : ", user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map