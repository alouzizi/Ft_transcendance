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
        return await this.friendshipService.getSendRequistFriends(sender);
    }
    async getRecivedRequistFriends(sender) {
        return await this.friendshipService.getRecivedRequistFriends(sender);
    }
    async getFriends(sender) {
        return await this.friendshipService.getFriends(sender);
    }
    async getBlockedUser(sender) {
        return await this.friendshipService.getBlockedUser(sender);
    }
    async addFriendRequest(sender, recived) {
        return await this.friendshipService.sendFriendRequist(sender, recived);
    }
    async removeFriendRequest(sender, recived) {
        return await this.friendshipService.removeFriendRequist(sender, recived);
    }
    async accepteFriendRequest(sender, recived) {
        await this.friendshipService.removeFriendRequist(recived, sender);
        return await this.friendshipService.accepteFriendRequest(sender, recived);
    }
    async deleteFriend(sender, recived) {
        return await this.friendshipService.deleteFriend(sender, recived);
    }
    async blockedUser(sender, recived) {
        await this.friendshipService.removeFriendRequist(recived, sender);
        await this.friendshipService.deleteFriend(recived, sender);
        return await this.friendshipService.blockedUser(sender, recived);
    }
    async unBlockedUser(sender, recived) {
        return await this.friendshipService.unBlockedUser(sender, recived);
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
    (0, common_1.Get)("/getSendFriendRequest/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getSendRequistFriends", null);
__decorate([
    (0, common_1.Get)("/getRecivedRequistFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getRecivedRequistFriends", null);
__decorate([
    (0, common_1.Get)("/getFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)("/getBlockedUser/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getBlockedUser", null);
__decorate([
    (0, common_1.Post)("/sendFriendRequest/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "addFriendRequest", null);
__decorate([
    (0, common_1.Delete)("/removeFriendRequest/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "removeFriendRequest", null);
__decorate([
    (0, common_1.Post)("/accepteFriendRequest/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "accepteFriendRequest", null);
__decorate([
    (0, common_1.Delete)("/deleteFriend/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "deleteFriend", null);
__decorate([
    (0, common_1.Post)("/blockedUser/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "blockedUser", null);
__decorate([
    (0, common_1.Delete)("/unBlockedUser/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unBlockedUser", null);
__decorate([
    (0, common_1.Get)("/allUsers/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getallUsers", null);
__decorate([
    (0, common_1.Get)("/getUserByNick/:recieverUsr"),
    __param(0, (0, common_1.Param)("recieverUsr")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getUserByNick", null);
__decorate([
    (0, common_1.Get)("/isBlocked/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getIsBlocked", null);
__decorate([
    (0, common_1.Get)("/onlineFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getOnlineFriends", null);
__decorate([
    (0, common_1.Get)("/allFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getAllFriends", null);
__decorate([
    (0, common_1.Get)("/pendingFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getPendingFriends", null);
__decorate([
    (0, common_1.Get)("/blockedFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getBlockedFriends", null);
__decorate([
    (0, common_1.Get)("/allPossibleFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getAllPossibleFriends", null);
__decorate([
    (0, common_1.Get)("/navSearchUsers/:sender"),
    __param(0, (0, common_1.Param)("sender")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getNavSearchUsers", null);
__decorate([
    (0, common_1.Post)("/sendFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "sendFriendRequest", null);
__decorate([
    (0, common_1.Post)("/acceptFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "acceptFriendRequest", null);
__decorate([
    (0, common_1.Post)("/unsendFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unsendFriendRequest", null);
__decorate([
    (0, common_1.Post)("/rejectFriendRequest/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "rejectFriendRequest", null);
__decorate([
    (0, common_1.Post)("/blockFriend/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "blockFriend", null);
__decorate([
    (0, common_1.Post)("/unblockFriend/:sender/:reciever"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("reciever")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unblockFriend", null);
__decorate([
    (0, common_1.Post)("/removeFriend/:sender/:reciever"),
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