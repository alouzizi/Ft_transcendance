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
const channel_service_1 = require("./channel.service");
const client_1 = require("@prisma/client");
let ChannelController = class ChannelController {
    constructor(channelService) {
        this.channelService = channelService;
    }
    createChannel(createChannelDto, senderId) {
        console.log(typeof createChannelDto.channelType, createChannelDto.channelType);
        const channelData = {
            ...createChannelDto,
            channelType: (createChannelDto.channelType == 'Private') ? client_1.ChannelType.Private : client_1.ChannelType.Public,
        };
        return this.channelService.createChannel(channelData, senderId);
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
};
exports.ChannelController = ChannelController;
__decorate([
    (0, common_1.Post)('/createChannel/:senderId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('senderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "createChannel", null);
__decorate([
    (0, common_1.Get)('/addUserToChannel/:senderId/:channelId/:userId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "addUserToChannel", null);
__decorate([
    (0, common_1.Get)('/getChannel/:senderId/:channelId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "getChannel", null);
__decorate([
    (0, common_1.Get)('/getMembersChannel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "getMembersChannel", null);
__decorate([
    (0, common_1.Get)('/changeStatusAdmin/:senderId/:channelId/:userId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "changeStatusAdmin", null);
__decorate([
    (0, common_1.Get)('/kickmember/:senderId/:channelId/:userId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "kickMember", null);
__decorate([
    (0, common_1.Get)('/bannedmember/:senderId/:channelId/:userId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "banMember", null);
__decorate([
    (0, common_1.Get)('/leaveChannel/:senderId/:channelId'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "leaveChannel", null);
__decorate([
    (0, common_1.Get)('/validePassword/:senderId/:channelId/:password'),
    __param(0, (0, common_1.Param)('senderId')),
    __param(1, (0, common_1.Param)('channelId')),
    __param(2, (0, common_1.Param)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "validePassword", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)('channel'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
//# sourceMappingURL=channel.controller.js.map