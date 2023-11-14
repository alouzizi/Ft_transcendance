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
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
const EXPIRE_TIME = 20 * 1000;
let AuthService = class AuthService {
    constructor(prisma, config, userService, jwtService) {
        this.prisma = prisma;
        this.config = config;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signToken(user) {
        const payload = {
            sub: user.intra_id,
            email: user.email,
        };
        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: "1h",
            secret: this.config.get("JWT_SECRET"),
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            expiresIn: "7d",
            secret: this.config.get("JWT_RefreshTokenKey"),
        });
        const myUser = user;
        delete myUser.hash;
        console.log("user -> ", user);
        return {
            access_token: access_token,
            refresh_token: refresh_token,
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
    }
    async refreshToken(user) {
        const payload = {
            sub: user.intra_id,
            email: user.email,
        };
        const access_token = await this.jwtService.signAsync(payload, {
            expiresIn: "7d",
            secret: this.config.get("JWT_SECRET"),
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            expiresIn: "7d",
            secret: this.config.get("JWT_RefreshTokenKey"),
        });
        return {
            access_token: access_token,
            refresh_token: refresh_token,
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
    }
    async generateAccessToken(user) {
        const payload = { sub: user.intra_id, nickname: user.login42 };
        console.log("paylod", payload);
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async valiadteUserAndCreateJWT(user) {
        try {
            const authResult = await this.userService.findByIntraId(user.intra_id);
            if (authResult) {
                return this.signToken(user);
            }
            else {
                return null;
            }
        }
        catch (error) {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map