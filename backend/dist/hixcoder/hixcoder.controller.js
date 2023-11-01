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
exports.HixcoderController = void 0;
const common_1 = require("@nestjs/common");
const hixcoder_service_1 = require("./hixcoder.service");
let HixcoderController = class HixcoderController {
    constructor(hixcoderService) {
        this.hixcoderService = hixcoderService;
    }
    async getallUsers(sender) {
        const senderId = parseInt(sender);
        return this.hixcoderService.getAllUsers(senderId);
    }
    async getOnlineFriends(sender) {
        const senderId = parseInt(sender);
        return this.hixcoderService.getOnlineFriends(senderId);
    }
    async getAllFriends(sender) {
        const senderId = parseInt(sender);
        return this.hixcoderService.getAllFriends(senderId);
    }
    async getPendingFriends(sender) {
        const senderId = parseInt(sender);
        return this.hixcoderService.getPendingFriends(senderId);
    }
    async getBlockedFriends(sender) {
        const senderId = parseInt(sender);
        return this.hixcoderService.getBlockedFriends(senderId);
    }
    async sendFriendRequest(sender, reciever) {
        const senderId = parseInt(sender);
        const recieverId = parseInt(reciever);
        return this.hixcoderService.sendFriendRequest(senderId, recieverId);
    }
    async blockFriend(sender, reciever) {
        const senderId = parseInt(sender);
        const recieverId = parseInt(reciever);
        return this.hixcoderService.blockFriend(senderId, recieverId);
    }
    async unblockFriend(sender, reciever) {
        const senderId = parseInt(sender);
        const recieverId = parseInt(reciever);
        return this.hixcoderService.unblockFriend(senderId, recieverId);
    }
    async removeFriend(sender, reciever) {
        const senderId = parseInt(sender);
        const recieverId = parseInt(reciever);
        return this.hixcoderService.removeFriend(senderId, recieverId);
    }
};
exports.HixcoderController = HixcoderController;
__decorate([
    (0, common_1.Get)("/allUsers/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getallUsers", null);
__decorate([
    (0, common_1.Get)("/onlineFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getOnlineFriends", null);
__decorate([
    (0, common_1.Get)("/allFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getAllFriends", null);
__decorate([
    (0, common_1.Get)("/pendingFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getPendingFriends", null);
__decorate([
    (0, common_1.Get)("/blockedFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getBlockedFriends", null);
__decorate([
    (0, common_1.Post)("/sendFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Post)("/blockFriend/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "blockFriend", null);
__decorate([
    (0, common_1.Post)("/unblockFriend/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "unblockFriend", null);
__decorate([
    (0, common_1.Post)("/removeFriend/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "removeFriend", null);
exports.HixcoderController = HixcoderController = __decorate([
    (0, common_1.Controller)("hixcoder"),
    __metadata("design:paramtypes", [hixcoder_service_1.HixcoderService])
], HixcoderController);
//# sourceMappingURL=hixcoder.controller.js.map