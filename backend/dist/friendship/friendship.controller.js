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
};
exports.FriendshipController = FriendshipController;
__decorate([
<<<<<<< HEAD
    (0, common_1.Get)("/getSendFriendRequest/:sender"),
    __param(0, (0, common_1.Param)("sender")),
=======
    (0, common_1.Get)('/getSendFriendRequest/:sender'),
    __param(0, (0, common_1.Param)('sender')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getSendRequistFriends", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Get)("/getRecivedRequistFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
=======
    (0, common_1.Get)('/getRecivedRequistFriends/:sender'),
    __param(0, (0, common_1.Param)('sender')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getRecivedRequistFriends", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Get)("/getFriends/:sender"),
    __param(0, (0, common_1.Param)("sender")),
=======
    (0, common_1.Get)('/getFriends/:sender'),
    __param(0, (0, common_1.Param)('sender')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getFriends", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Get)("/getBlockedUser/:sender"),
    __param(0, (0, common_1.Param)("sender")),
=======
    (0, common_1.Get)('/getBlockedUser/:sender'),
    __param(0, (0, common_1.Param)('sender')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "getBlockedUser", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Post)("/sendFriendRequest/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
=======
    (0, common_1.Post)('/sendFriendRequest/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "addFriendRequest", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Delete)("/removeFriendRequest/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
=======
    (0, common_1.Delete)('/removeFriendRequest/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "removeFriendRequest", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Post)("/accepteFriendRequest/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
=======
    (0, common_1.Post)('/accepteFriendRequest/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "accepteFriendRequest", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Delete)("/deleteFriend/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
=======
    (0, common_1.Delete)('/deleteFriend/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "deleteFriend", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Post)("/blockedUser/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
=======
    (0, common_1.Post)('/blockedUser/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "blockedUser", null);
__decorate([
<<<<<<< HEAD
    (0, common_1.Delete)("/unBlockedUser/:sender/:recived"),
    __param(0, (0, common_1.Param)("sender")),
    __param(1, (0, common_1.Param)("recived")),
=======
    (0, common_1.Delete)('/unBlockedUser/:sender/:recived'),
    __param(0, (0, common_1.Param)('sender')),
    __param(1, (0, common_1.Param)('recived')),
>>>>>>> implement the sockets successfully
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "unBlockedUser", null);
exports.FriendshipController = FriendshipController = __decorate([
<<<<<<< HEAD
    (0, common_1.Controller)("friendship"),
=======
    (0, common_1.Controller)('friendship'),
>>>>>>> implement the sockets successfully
    __metadata("design:paramtypes", [friendship_service_1.FriendshipService])
], FriendshipController);
//# sourceMappingURL=friendship.controller.js.map