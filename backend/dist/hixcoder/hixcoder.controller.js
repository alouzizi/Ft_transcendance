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
        return this.hixcoderService.getAllUsers(sender);
    }
    async getOneUser(reciever) {
        return this.hixcoderService.getOneUser(reciever);
    }
    async getOnlineFriends(sender) {
        return this.hixcoderService.getOnlineFriends(sender);
    }
    async getAllFriends(sender) {
        return this.hixcoderService.getAllFriends(sender);
    }
    async getPendingFriends(sender) {
        return this.hixcoderService.getPendingFriends(sender);
    }
    async getBlockedFriends(sender) {
        return this.hixcoderService.getBlockedFriends(sender);
    }
    async getAllPossibleFriends(sender) {
        return this.hixcoderService.getAllPossibleFriends(sender);
    }
    async getNavSearchUsers(sender) {
        return this.hixcoderService.getNavSearchUsers(sender);
    }
    async sendFriendRequest(sender, reciever) {
        return this.hixcoderService.sendFriendRequest(sender, reciever);
    }
    async acceptFriendRequest(sender, reciever) {
        return this.hixcoderService.acceptFriendRequest(sender, reciever);
    }
    async unsendFriendRequest(sender, reciever) {
        return this.hixcoderService.unsendFriendRequest(sender, reciever);
    }
    async rejectFriendRequest(sender, reciever) {
        return this.hixcoderService.rejectFriendRequest(sender, reciever);
    }
    async blockFriend(sender, reciever) {
        return this.hixcoderService.blockFriend(sender, reciever);
    }
    async unblockFriend(sender, reciever) {
        return this.hixcoderService.unblockFriend(sender, reciever);
    }
    async removeFriend(sender, reciever) {
        return this.hixcoderService.removeFriend(sender, reciever);
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
    (0, common_1.Get)("/oneUser/:reciever"),
    __param(0, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getOneUser", null);
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
    (0, common_1.Get)("/allPossibleFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getAllPossibleFriends", null);
__decorate([
    (0, common_1.Get)("/navSearchUsers/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getNavSearchUsers", null);
__decorate([
    (0, common_1.Post)("/sendFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Post)("/acceptFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, common_1.Post)("/unsendFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "unsendFriendRequest", null);
__decorate([
    (0, common_1.Post)("/rejectFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "rejectFriendRequest", null);
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