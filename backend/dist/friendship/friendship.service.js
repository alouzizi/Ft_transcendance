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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FriendshipService = class FriendshipService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendFriendRequist(sendId, recivedId) {
        let req = await this.prisma.friendRequest.findUnique({
            where: {
                Unique_Sender_Receiver: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            },
        });
        if (!req) {
            req = await this.prisma.friendRequest.create({
                data: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            });
        }
        return req;
    }
    async removeFriendRequist(sendId, recivedId) {
        let req = await this.prisma.friendRequest.deleteMany({
            where: {
                senderId: sendId,
                receivedId: recivedId,
            },
        });
        return req;
    }
    async accepteFriendRequest(sendId, recivedId) {
        let req = await this.prisma.friend.findUnique({
            where: {
                Unique_Sender_Receiver: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            },
        });
        if (!req) {
            req = await this.prisma.friend.create({
                data: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            });
        }
        return req;
    }
    async deleteFriend(sendId, recivedId) {
        let req = await this.prisma.friend.deleteMany({
            where: {
                OR: [
                    {
                        senderId: sendId,
                        receivedId: recivedId,
                    },
                    {
                        senderId: recivedId,
                        receivedId: sendId,
                    },
                ],
            },
        });
        return req;
    }
    async blockedUser(sendId, recivedId) {
        let req = await this.prisma.blockedUser.findUnique({
            where: {
                Unique_Sender_Receiver: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            },
        });
        if (!req) {
            req = await this.prisma.blockedUser.create({
                data: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            });
        }
        return req;
    }
    async unBlockedUser(sendId, recivedId) {
        let req = await this.prisma.blockedUser.deleteMany({
            where: {
                senderId: sendId,
                receivedId: recivedId,
            },
        });
        return req;
    }
    async getSendRequistFriends(senderId) {
        const sendRequests = await this.prisma.friendRequest.findMany({
            where: {
                senderId: senderId,
            },
        });
        return sendRequests;
    }
    async getRecivedRequistFriends(senderId) {
        const sendRequests = await this.prisma.friendRequest.findMany({
            where: {
                receivedId: senderId,
            },
        });
        return sendRequests;
    }
    async getFriends(senderId) {
        const sendRequests = await this.prisma.friend.findMany({
            where: {
                OR: [
                    {
                        senderId: senderId,
                    },
                    {
                        receivedId: senderId,
                    },
                ],
            },
        });
        return sendRequests;
    }
    async getBlockedUser(senderId) {
        const sendRequests = await this.prisma.blockedUser.findMany({
            where: {
                OR: [
                    {
                        senderId: senderId,
                    },
                    {
                        receivedId: senderId,
                    },
                ],
            },
        });
        return sendRequests;
    }
};
exports.FriendshipService = FriendshipService;
exports.FriendshipService = FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendshipService);
//# sourceMappingURL=friendship.service.js.map