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
exports.HixcoderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const class_validator_1 = require("class-validator");
let HixcoderService = class HixcoderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOnlineFriends(senderId) {
        try {
            const allFriends = await this.prisma.friend.findMany({
                where: {
                    senderId: senderId,
                },
            });
            const onlineFriends = [];
            for (const element of allFriends) {
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: element.receivedId,
                        status: "ACTIF",
                    },
                });
                if (!(0, class_validator_1.isEmpty)(user)) {
                    console.log(user);
                    onlineFriends.push(user);
                }
            }
            return onlineFriends;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async getAllFriends(senderId) {
        try {
            const allFriends = await this.prisma.friend.findMany({
                where: {
                    senderId: senderId,
                },
            });
            const onlineFriends = [];
            for (const element of allFriends) {
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: element.receivedId,
                    },
                });
                if (!(0, class_validator_1.isEmpty)(user)) {
                    console.log(user);
                    onlineFriends.push(user);
                }
            }
            return onlineFriends;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async getPendingFriends(senderId) {
        try {
            const pendingFriends = await this.prisma.friendRequest.findMany({
                where: {
                    senderId: senderId,
                },
            });
            return pendingFriends;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async getBlockedFriends(senderId) {
        try {
            const blockedFriends = await this.prisma.blockedUser.findMany({
                where: {
                    senderId: senderId,
                },
            });
            return blockedFriends;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async sendFriendRequest(senderId, recieverId) {
        try {
            const user = await this.prisma.friendRequest.create({
                data: {
                    senderId: senderId,
                    receivedId: recieverId,
                },
            });
            return user;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async blockFriend(senderId, recieverId) {
        try {
            const friendToDelete = await this.prisma.friend.findUnique({
                where: {
                    Unique_Sender_Receiver: {
                        senderId: senderId,
                        receivedId: recieverId,
                    },
                },
            });
            if (friendToDelete) {
                await this.prisma.friend.delete({
                    where: {
                        id: friendToDelete.id,
                    },
                });
            }
            const user = await this.prisma.blockedUser.create({
                data: {
                    senderId: senderId,
                    receivedId: recieverId,
                },
            });
            return user;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async unblockFriend(senderId, recieverId) {
        try {
            const friendToUnblock = await this.prisma.blockedUser.findUnique({
                where: {
                    Unique_Sender_Receiver: {
                        senderId: senderId,
                        receivedId: recieverId,
                    },
                },
            });
            if (friendToUnblock) {
                await this.prisma.blockedUser.delete({
                    where: {
                        id: friendToUnblock.id,
                    },
                });
            }
            const user = await this.prisma.friend.create({
                data: {
                    senderId: senderId,
                    receivedId: recieverId,
                },
            });
            return user;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async test_giveFriendsToUser(userId) {
        const allUsers = await this.prisma.user.findMany();
        for (const otherUser of allUsers) {
            await this.prisma.friend.create({
                data: {
                    senderId: userId,
                    receivedId: otherUser.id,
                },
            });
        }
        const result = await this.prisma.friend.findMany();
        return result;
    }
    async test_createManyUsers() {
        const index = Math.floor(Math.random() * 100) + 1;
        const hash = await argon.hash("1234");
        const myData = [
            {
                email: "fsdf@gmail.com",
                hash: hash,
                avatar: `https://randomuser.me/api/portraits/women/${index}.jpg`,
                username: "kkkfds",
            },
            {
                email: "john_smith@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/men/4.jpg",
                username: "johnsmith1",
            },
            {
                email: "jane_doe@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/women/5.jpg",
                username: "janedoe2",
            },
            {
                email: "michael_williams@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/men/6.jpg",
                username: "michaelwilliams3",
            },
            {
                email: "emily_johnson@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/women/7.jpg",
                username: "emilyjohnson4",
            },
            {
                email: "alex_smith@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/men/8.jpg",
                username: "alexsmith5",
            },
            {
                email: "sarah_davis@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/women/9.jpg",
                username: "sarahdavis6",
            },
            {
                email: "robert_wilson@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/men/10.jpg",
                username: "robertwilson7",
            },
            {
                email: "olivia_jones@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/women/11.jpg",
                username: "oliviajones8",
            },
            {
                email: "william_brown@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/men/12.jpg",
                username: "williambrown9",
            },
            {
                email: "ava_miller@gmail.com",
                hash: hash,
                avatar: "https://randomuser.me/api/portraits/women/13.jpg",
                username: "avamiller10",
            },
        ];
        const users = await this.prisma.user.createMany({
            data: myData,
        });
        console.log(users);
    }
};
exports.HixcoderService = HixcoderService;
exports.HixcoderService = HixcoderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HixcoderService);
//# sourceMappingURL=hixcoder.service.js.map