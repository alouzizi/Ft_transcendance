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
exports.FriendshipController = void 0;
const common_1 = require("@nestjs/common");
const friendship_service_1 = require("./friendship.service");
let FriendshipController = class FriendshipController {
    constructor(friendshipService) {
        this.friendshipService = friendshipService;
    }
    async getSendRequistFriends(sender) {
        const senderId = parseInt(sender);
        return await this.friendshipService.getSendRequistFriends(senderId);
    }
    async getRecivedRequistFriends(sender) {
        const senderId = parseInt(sender);
        return await this.friendshipService.getRecivedRequistFriends(senderId);
    }
    async getFriends(sender) {
        const senderId = parseInt(sender);
        return await this.friendshipService.getFriends(senderId);
    }
    async getBlockedUser(sender) {
        const senderId = parseInt(sender);
        return await this.friendshipService.getBlockedUser(senderId);
    }
    async addFriendRequest(sender, recived) {
        const senderId = parseInt(sender);
        const recivedId = parseInt(recived);
        return await this.friendshipService.sendFriendRequist(senderId, recivedId);
    }
    async removeFriendRequest(sender, recived) {
        const senderId = parseInt(sender);
        const recivedId = parseInt(recived);
        return await this.friendshipService.removeFriendRequist(senderId, recivedId);
    }
    async accepteFriendRequest(sender, recived) {
        const senderId = parseInt(sender);
        const recivedId = parseInt(recived);
        await this.friendshipService.removeFriendRequist(recivedId, senderId);
        return await this.friendshipService.accepteFriendRequest(senderId, recivedId);
    }
    async deleteFriend(sender, recived) {
        const senderId = parseInt(sender);
        const recivedId = parseInt(recived);
        return await this.friendshipService.deleteFriend(senderId, recivedId);
    }
    async blockedUser(sender, recived) {
        const senderId = parseInt(sender);
        const recivedId = parseInt(recived);
        await this.friendshipService.removeFriendRequist(recivedId, senderId);
        await this.friendshipService.deleteFriend(recivedId, senderId);
        return await this.friendshipService.blockedUser(senderId, recivedId);
    }
    async unBlockedUser(sender, recived) {
        const senderId = parseInt(sender);
        const recivedId = parseInt(recived);
        return await this.friendshipService.unBlockedUser(senderId, recivedId);
    }
};
exports.FriendshipController = FriendshipController;
__decorate([
    (0, common_1.Get)('/getSendFriendRequest/:sender'),
    __param(0, (0, common_1.Param)('sender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getSendRequistFriends", null);
__decorate([
    (0, common_1.Get)('/getRecivedRequistFriends/:sender'),
    __param(0, (0, common_1.Param)('sender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getRecivedRequistFriends", null);
__decorate([
    (0, common_1.Get)('/getFriends/:sender'),
    __param(0, (0, common_1.Param)('sender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)('/getBlockedUser/:sender'),
    __param(0, (0, common_1.Param)('sender')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getBlockedUser", null);
__decorate([
    (0, common_1.Post)('/sendFriendRequest/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "addFriendRequest", null);
__decorate([
    (0, common_1.Delete)('/removeFriendRequest/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "removeFriendRequest", null);
__decorate([
    (0, common_1.Post)('/accepteFriendRequest/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "accepteFriendRequest", null);
__decorate([
    (0, common_1.Delete)('/deleteFriend/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "deleteFriend", null);
__decorate([
    (0, common_1.Post)('/blockedUser/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "blockedUser", null);
__decorate([
    (0, common_1.Delete)('/unBlockedUser/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unBlockedUser", null);
exports.FriendshipController = FriendshipController = __decorate([
    (0, common_1.Controller)('friendship'),
    __metadata("design:paramtypes", [friendship_service_1.FriendshipService])
], FriendshipController);
//# sourceMappingURL=friendship.controller.js.map