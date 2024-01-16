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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const guard_1 = require("../auth/guard");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserProfile(id) {
        return await this.userService.findById(id);
    }
    async getUserByIdintr(req) {
        try {
            const user = await this.userService.findByOwnerById(req.user.sub);
            return user;
        }
        catch (error) { }
    }
    async getAllUser() {
        return await this.userService.findAllUsers();
    }
    async getValideUsers(senderId) {
        return await this.userService.getValideUsers(senderId);
    }
    async updatUserdata(intra_id, nickname) {
        return await this.userService.updateNickname(intra_id, nickname);
    }
    uploadImage(file, senderId) {
        return this.userService.uploadImage(senderId, file.path);
    }
    async getUsersCanJoinChannel(senderId, channelId) {
        return await this.userService.usersCanJoinChannel(senderId, channelId);
    }
    async getUserGeust(id) {
        return await this.userService.getUserGeust(id);
    }
    async getChannelGeust(senderId, id) {
        return await this.userService.getChannelGeust(senderId, id);
    }
    async checkIsBlocked(senderId, receivedId) {
        return await this.userService.checkIsBlocked(senderId, receivedId);
    }
    async startGameing(senderId) {
        return await this.userService.startGameing(senderId);
    }
    async finishGaming(senderId) {
        return await this.userService.finishGaming(senderId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('geust/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)('/intra'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByIdintr", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)('/getValideUsers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getValideUsers", null);
__decorate([
    (0, common_1.Post)('updateNickname/:intra_id/:nickname'),
    __param(0, (0, common_1.Param)('intra_id')),
    __param(1, (0, common_1.Param)('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatUserdata", null);
__decorate([
    (0, common_1.Post)('/uploadImage/:intra_id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.')[1];
                const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;
                cb(null, newFileName);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
                return cb(null, false);
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('intra_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)('/getUsersCanJoinChannel/:senderId/:channelId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsersCanJoinChannel", null);
__decorate([
    (0, common_1.Get)('getUserGeust/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserGeust", null);
__decorate([
    (0, common_1.Get)('getChannelGeust/:senderId/:id'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getChannelGeust", null);
__decorate([
    (0, common_1.Get)('checkIsBlocked/:senderId/:receivedId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('receivedId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkIsBlocked", null);
__decorate([
    (0, common_1.Post)('startGameing/:senderId'),
    __param(0, (0, common_1.Param)('senderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "startGameing", null);
__decorate([
    (0, common_1.Post)('finishGaming/:senderId'),
    __param(0, (0, common_1.Param)('senderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "finishGaming", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map