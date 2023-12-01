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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
let MessageController = class MessageController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async getDirectMessage(send, rec) {
        return this.messagesService.getDirectMessage(send, rec);
    }
    async getChannelMessage(send, channelId) {
        return this.messagesService.getChannelMessage(send, channelId);
    }
    async getUserForMsg(senderId) {
        return await this.messagesService.getMessageForList(senderId);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Get)('getDirectMessage/:send/:rec'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('send')),
    __param(1, (0, common_1.Param)('rec')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getDirectMessage", null);
__decorate([
    (0, common_1.Get)('getChannelMessage/:send/:channelId'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('send')),
    __param(1, (0, common_1.Param)('channelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getChannelMessage", null);
__decorate([
    (0, common_1.Get)('/getUserForMsg/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getUserForMsg", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessageController);
//# sourceMappingURL=messages.controller.js.map