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
exports.ChannelController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const client_1 = require("@prisma/client");
const multer_1 = require("multer");
const guard_1 = require("../auth/guard");
const channel_service_1 = require("./channel.service");
let ChannelController = class ChannelController {
    constructor(channelService) {
        this.channelService = channelService;
    }
    createChannel(createChannelDto, senderId) {
        const channelData = {
            ...createChannelDto,
            channelType: (createChannelDto.channelType == 'Private') ? client_1.ChannelType.Private : client_1.ChannelType.Public,
        };
        return this.channelService.createChannel(channelData, senderId);
    }
    updateChannel(createChannelDto, senderId, channelId) {
        const channelData = {
            ...createChannelDto,
            channelType: (createChannelDto.channelType == 'Private') ? client_1.ChannelType.Private : client_1.ChannelType.Public,
        };
        return this.channelService.updateChannel(senderId, channelId, channelData);
    }
    uploadImage(file, senderId, channelId) {
        return this.channelService.uploadImageChannel(senderId, channelId, file.path);
    }
    checkOwnerIsAdmin(senderId, channelId) {
        return this.channelService.checkOwnerIsAdmin(senderId, channelId);
    }
    checkUserIsInChannel(senderId, channelId) {
        return this.channelService.checkUserIsInChannel(senderId, channelId);
    }
    addUserToChannel(senderId, channelId, userId) {
        return this.channelService.addUserToChannel(senderId, channelId, userId);
    }
    getChannel(senderId, channelId) {
        return this.channelService.getChannel(senderId, channelId);
    }
    getMembersChannel(id) {
        return this.channelService.getMembersChannel(id);
    }
    changeStatusAdmin(senderId, channelId, userId) {
        return this.channelService.changeStatusAdmin(senderId, channelId, userId);
    }
    kickMember(senderId, channelId, userId) {
        return this.channelService.KickMember(senderId, channelId, userId);
    }
    banMember(senderId, channelId, userId) {
        return this.channelService.changeStatutsBanned(senderId, channelId, userId);
    }
    leaveChannel(senderId, channelId) {
        return this.channelService.leaveChannel(senderId, channelId);
    }
    validePassword(senderId, channelId, password) {
        return this.channelService.validePassword(senderId, channelId, password);
    }
    getValideChannels(senderId) {
        return this.channelService.getValideChannels(senderId);
    }
    joinChannel(senderId, channelId) {
        return this.channelService.joinChannel(senderId, channelId);
    }
    muteUserChannel(senderId, channelId, userId, timer) {
        return this.channelService.muteUserFromChannel(senderId, channelId, userId, timer);
    }
    checkIsMuted(senderId, channelId) {
        return this.channelService.checkIsMuted(senderId, channelId);
    }
    cancelTimeOutByAdmin(senderId, channelId, userId) {
        return this.channelService.cancelTimeOutByAdmin(senderId, channelId, userId);
    }
};
exports.ChannelController = ChannelController;
__decorate([
    (0, common_1.Post)('/createChannel/:senderId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('senderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "createChannel", null);
__decorate([
    (0, common_1.Post)('/updateChannel/:senderId/:channelId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('senderId')),
    __param(2, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "updateChannel", null);
__decorate([
    (0, common_1.Post)("/uploadImage/:senderId/:channelId"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split(".")[0];
                const fileExtension = file.originalname.split(".")[1];
                const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
                cb(null, newFileName);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
                return cb(null, false);
            cb(null, true);
        }
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)("senderId")),
    __param(2, (0, common_1.Param)("channelId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Get)('/checkOwnerIsAdmin/:senderId/:channelId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "checkOwnerIsAdmin", null);
__decorate([
    (0, common_1.Get)('/checkUserIsInChannel/:senderId/:channelId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "checkUserIsInChannel", null);
__decorate([
    (0, common_1.Get)('/addUserToChannel/:senderId/:channelId/:userId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "addUserToChannel", null);
__decorate([
    (0, common_1.Get)('/getChannel/:senderId/:channelId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "getChannel", null);
__decorate([
    (0, common_1.Get)('/getMembersChannel/:id'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "getMembersChannel", null);
__decorate([
    (0, common_1.Get)('/changeStatusAdmin/:senderId/:channelId/:userId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "changeStatusAdmin", null);
__decorate([
    (0, common_1.Get)('/kickmember/:senderId/:channelId/:userId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "kickMember", null);
__decorate([
    (0, common_1.Get)('/bannedmember/:senderId/:channelId/:userId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "banMember", null);
__decorate([
    (0, common_1.Get)('/leaveChannel/:senderId/:channelId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "leaveChannel", null);
__decorate([
    (0, common_1.Get)('/validePassword/:senderId/:channelId/:password'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "validePassword", null);
__decorate([
    (0, common_1.Get)('/getValideChannels/:senderId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "getValideChannels", null);
__decorate([
    (0, common_1.Get)('/joinChannel/:senderId/:channelId/'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "joinChannel", null);
__decorate([
    (0, common_1.Get)('/muteUserChannel/:senderId/:channelId/:userId/:timer'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __param(3, (0, common_1.Param)('timer')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "muteUserChannel", null);
__decorate([
    (0, common_1.Get)('/checkIsMuted/:senderId/:channelId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "checkIsMuted", null);
__decorate([
    (0, common_1.Get)('/cancelTimeOutByAdmin/:senderId/:channelId/:userId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "cancelTimeOutByAdmin", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)('channel'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
//# sourceMappingURL=channel.controller.js.map