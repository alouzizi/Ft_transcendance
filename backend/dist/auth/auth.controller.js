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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_guard_1 = require("./guard/jwt.guard");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async loginWith42(req) {
    }
    async checkTockenIsValide(req, intra_id) {
        return true;
    }
    async register(req) {
        const { otpAuthUrl } = await this.authService.generateTwoFactorAuthSecret(req.user);
        const qrcode = await this.authService.generateQrCodeDataURL(otpAuthUrl);
        return qrcode;
    }
    async turnOffTwoFactorAuthentication(intra_id) {
        console.log("intraid", intra_id);
        await this.userService.turnOffTwoFactorAuth(intra_id);
    }
    async turnOnTwoFactorAuthentication(res, intra_id, authCode) {
        const isCodeValid = await this.authService.isTwoFactorAuthCodeValid(authCode, intra_id);
        if (!isCodeValid) {
            throw new common_1.UnauthorizedException('Wrong authentication code');
        }
        await this.userService.turnOnTwoFactorAuth(intra_id);
        res.send({ isCodeValid: isCodeValid });
    }
    async authenticate(intra_id, authCode) {
        const isCodeValid = await this.authService.isTwoFactorAuthCodeValid(authCode, intra_id);
        if (!isCodeValid) {
            throw new common_1.UnauthorizedException('Wrong authentication code');
        }
        const ret = await this.authService.valiadteUserAndCreateJWT(intra_id);
        return ret.access_token;
    }
    async callbackWith42(req, res) {
        const ret = await this.authService.valiadteUserAndCreateJWT(req.user.intra_id);
        if (ret != null) {
        }
        res.cookie('intra_id', req.user.intra_id);
        if (req.user.isTwoFactorAuthEnabled)
            res.redirect("http://localhost:3000/Checker2faAuth");
        else {
            res.cookie('access_token', ret.access_token);
            res.redirect("http://localhost:3000/protected/DashboardPage");
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('login42'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('42-intranet')),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginWith42", null);
__decorate([
    (0, common_1.Get)('checkTokenIsValide/:intra_id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('intra_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkTockenIsValide", null);
__decorate([
    (0, common_1.Get)('2fa/generate'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('2fa/turn-off/:intra_id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('intra_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "turnOffTwoFactorAuthentication", null);
__decorate([
    (0, common_1.Post)('2fa/turn-on/:intra_id/:authCode'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('intra_id')),
    __param(2, (0, common_1.Param)('authCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "turnOnTwoFactorAuthentication", null);
__decorate([
    (0, common_1.Get)('2fa/authenticate/:intra_id/:authCode'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('intra_id')),
    __param(1, (0, common_1.Param)('authCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticate", null);
__decorate([
    (0, common_1.Get)('42-intranet/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('42-intranet')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "callbackWith42", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map