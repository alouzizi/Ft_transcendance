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
            channelType: (createChannelDto.channelType == '1') ? client_1.ChannelType.Private : client_1.ChannelType.Public,
        };
        return this.channelService.createChannel(channelData, senderId);
    }
    getMembersChannel(id) {
        return this.channelService.getMembersChannel(id);
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
    (0, common_1.Get)('/getMembersChannel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelController.prototype, "getMembersChannel", null);
exports.ChannelController = ChannelController = __decorate([
    (0, common_1.Controller)('channel'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
//# sourceMappingURL=channel.controller.js.map