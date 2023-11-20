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
const guard_1 = require("../auth/guard");
let FriendshipController = class FriendshipController {
    constructor(friendshipService) {
        this.friendshipService = friendshipService;
    }
    async unBlockedUser(sender, recived) {
        return await this.friendshipService.unBlockedUser_2(sender, recived);
    }
    async getallUsers(sender) {
        return this.friendshipService.getAllUsers(sender);
    }
    async getUserByNick(reciever) {
        return this.friendshipService.getUserByNick(reciever);
    }
    async getIsBlocked(sender, reciever) {
        return this.friendshipService.getIsBlocked(sender, reciever);
    }
    async getOnlineFriends(sender) {
        return this.friendshipService.getOnlineFriends(sender);
    }
    async getAllFriends(sender) {
        return this.friendshipService.getAllFriends(sender);
    }
    async getPendingFriends(sender) {
        return this.friendshipService.getPendingFriends(sender);
    }
    async getBlockedFriends(sender) {
        return this.friendshipService.getBlockedFriends(sender);
    }
    async getAllPossibleFriends(sender) {
        return this.friendshipService.getAllPossibleFriends(sender);
    }
    async getNavSearchUsers(sender) {
        return this.friendshipService.getNavSearchUsers(sender);
    }
    async sendFriendRequest(sender, reciever) {
        return this.friendshipService.sendFriendRequest(sender, reciever);
    }
    async acceptFriendRequest(sender, reciever) {
        return this.friendshipService.acceptFriendRequest(sender, reciever);
    }
    async unsendFriendRequest(sender, reciever) {
        return this.friendshipService.unsendFriendRequest(sender, reciever);
    }
    async rejectFriendRequest(sender, reciever) {
        return this.friendshipService.rejectFriendRequest(sender, reciever);
    }
    async blockFriend(sender, reciever) {
        return this.friendshipService.blockFriend(sender, reciever);
    }
    async unblockFriend(sender, reciever) {
        return this.friendshipService.unblockFriend(sender, reciever);
    }
    async removeFriend(sender, reciever) {
        return this.friendshipService.removeFriend(sender, reciever);
    }
};
exports.FriendshipController = FriendshipController;
__decorate([
    (0, common_1.Delete)("/unBlockedUser/:sender/:recived"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unBlockedUser", null);
__decorate([
    (0, common_1.Get)("/allUsers/:sender"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getallUsers", null);
__decorate([
    (0, common_1.Get)("/getUserByNick/:recieverUsr"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("recieverUsr")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getUserByNick", null);
__decorate([
    (0, common_1.Get)("/isBlocked/:sender/:reciever"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getIsBlocked", null);
__decorate([
    (0, common_1.Get)("/onlineFriends/:sender"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getOnlineFriends", null);
__decorate([
    (0, common_1.Get)("/allFriends/:sender"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getAllFriends", null);
__decorate([
    (0, common_1.Get)("/pendingFriends/:sender"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getPendingFriends", null);
__decorate([
    (0, common_1.Get)("/blockedFriends/:sender"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getBlockedFriends", null);
__decorate([
    (0, common_1.Get)("/allPossibleFriends/:sender"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getAllPossibleFriends", null);
__decorate([
    (0, common_1.Get)("/navSearchUsers/:sender"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getNavSearchUsers", null);
__decorate([
    (0, common_1.Post)("/sendFriendRequest/:sender/:reciever"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Post)("/acceptFriendRequest/:sender/:reciever"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, common_1.Post)("/unsendFriendRequest/:sender/:reciever"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unsendFriendRequest", null);
__decorate([
    (0, common_1.Post)("/rejectFriendRequest/:sender/:reciever"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "rejectFriendRequest", null);
__decorate([
    (0, common_1.Post)("/blockFriend/:sender/:reciever"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "blockFriend", null);
__decorate([
    (0, common_1.Post)("/unblockFriend/:sender/:reciever"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unblockFriend", null);
__decorate([
    (0, common_1.Post)("/removeFriend/:sender/:reciever"),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "removeFriend", null);
exports.FriendshipController = FriendshipController = __decorate([
    (0, common_1.Controller)("friendship"),
    __metadata("design:paramtypes", [friendship_service_1.FriendshipService])
], FriendshipController);
//# sourceMappingURL=friendship.controller.js.map