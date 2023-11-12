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
const class_validator_1 = require("class-validator");
let HixcoderService = class HixcoderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers(senderId) {
        try {
            const allUsers = await this.prisma.user.findMany({
                where: {
                    NOT: {
                        id: senderId,
                    },
                },
            });
            return allUsers;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async getOneUser(recieverUsr) {
        try {
            const oneUser = await this.prisma.user.findFirst({
                where: {
                    nickname: recieverUsr,
                },
            });
            return oneUser;
        }
        catch (error) {
            console.log("getOneUser error: ", error);
            return null;
        }
    }
    async getIsBlocked(recieverId, senderId) {
        try {
            const isBlocked = await this.prisma.blockedUser.findFirst({
                where: {
                    OR: [
                        {
                            senderId: senderId,
                            receivedId: recieverId,
                        },
                        {
                            senderId: recieverId,
                            receivedId: senderId,
                        },
                    ],
                },
            });
            if (isBlocked) {
                return {
                    isBlocked: true,
                };
            }
            return {
                isBlocked: false,
            };
        }
        catch (error) {
            console.log("getOneUser error: ", error);
            return null;
        }
    }
    async getOnlineFriends(senderId) {
        try {
            const allFriends = await this.getAllFriends(senderId);
            const onlineFriends = [];
            for (const element of allFriends) {
                if (element.status === "ACTIF") {
                    onlineFriends.push(element);
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
            const [allFriendsTmp1, allFriendsTmp2] = await Promise.all([
                this.prisma.friend.findMany({
                    where: {
                        senderId: senderId,
                    },
                }),
                this.prisma.friend.findMany({
                    where: {
                        receivedId: senderId,
                    },
                }),
            ]);
            const allFriendsIds = [
                ...allFriendsTmp1.map((friend) => friend.receivedId),
                ...allFriendsTmp2.map((friend) => friend.senderId),
            ];
            const allFriends = await this.prisma.user.findMany({
                where: {
                    id: {
                        in: allFriendsIds,
                    },
                },
            });
            return allFriends;
        }
        catch (error) {
            console.log("error: ", error);
            return null;
        }
    }
    async getPendingFriends(senderId) {
        try {
            const [pendingFriendsTmp1, pendingFriendsTmp2] = await Promise.all([
                this.prisma.friendRequest.findMany({
                    where: {
                        senderId: senderId,
                    },
                }),
                this.prisma.friendRequest.findMany({
                    where: {
                        receivedId: senderId,
                    },
                }),
            ]);
            const pendingFriendsIds = [
                ...pendingFriendsTmp1.map((friend) => friend.receivedId),
                ...pendingFriendsTmp2.map((friend) => friend.senderId),
            ];
            const pendingFriends = await this.prisma.user.findMany({
                where: {
                    id: {
                        in: pendingFriendsIds,
                    },
                },
            });
            const formattedPendingFriends = pendingFriends.map((friend) => {
                const isYouSender1 = pendingFriendsTmp1.find((item) => item.receivedId === friend.id);
                const isYouSender2 = pendingFriendsTmp2.find((item) => item.senderId === friend.id);
                return {
                    ...friend,
                    isYouSender: isYouSender1 ? true : isYouSender2 ? false : null,
                };
            });
            return formattedPendingFriends;
        }
        catch (error) {
            console.log("error: ", error);
            return null;
        }
    }
    async getBlockedFriends(senderId) {
        try {
            const blockedFriendsTmp = await this.prisma.blockedUser.findMany({
                where: {
                    senderId: senderId,
                },
            });
            const blockedFriends = [];
            for (const element of blockedFriendsTmp) {
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: element.receivedId,
                    },
                });
                if (!(0, class_validator_1.isEmpty)(user)) {
                    console.log(user);
                    blockedFriends.push(user);
                }
            }
            return blockedFriends;
        }
        catch (error) {
            console.log("error:", error);
            return null;
        }
    }
    async getAllPossibleFriends(senderId) {
        try {
            const allUsers = await this.prisma.user.findMany({
                where: {
                    NOT: {
                        id: senderId,
                    },
                },
            });
            const allFriends = await this.prisma.friend.findMany({
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
            const blockedFriendsTmp = await this.prisma.blockedUser.findMany({
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
            const possibleFriends = allUsers.filter((user) => {
                const isFriend = allFriends.some((friend) => friend.senderId === user.id || friend.receivedId === user.id);
                const isBlocked = blockedFriendsTmp.some((blocked) => blocked.senderId === user.id || blocked.receivedId === user.id);
                return !isFriend && !isBlocked;
            });
            return possibleFriends;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async getNavSearchUsers(senderId) {
        try {
            const allUsers = await this.prisma.user.findMany({
                where: {
                    NOT: {
                        id: senderId,
                    },
                },
            });
            const blockedFriendsTmp = await this.prisma.blockedUser.findMany({
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
            const possibleFriends = allUsers.filter((user) => {
                const isBlocked = blockedFriendsTmp.some((blocked) => blocked.senderId === user.id || blocked.receivedId === user.id);
                return !isBlocked;
            });
            return possibleFriends;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async sendFriendRequest(senderId, recieverId) {
        try {
            const isPending = await this.prisma.friendRequest.findFirst({
                where: {
                    OR: [
                        {
                            senderId: senderId,
                            receivedId: recieverId,
                        },
                        {
                            senderId: recieverId,
                            receivedId: senderId,
                        },
                    ],
                },
            });
            if (isPending) {
                return null;
            }
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
    async acceptFriendRequest(senderId, recieverId) {
        try {
            const userToAccept = await this.prisma.friendRequest.findUnique({
                where: {
                    Unique_Sender_Receiver: {
                        senderId: recieverId,
                        receivedId: senderId,
                    },
                },
            });
            console.log("userToAccept : ", userToAccept);
            if (userToAccept) {
                const user = await this.prisma.friend.create({
                    data: {
                        senderId: senderId,
                        receivedId: recieverId,
                    },
                });
                console.log();
                await this.prisma.friendRequest.delete({
                    where: {
                        Unique_Sender_Receiver: {
                            senderId: recieverId,
                            receivedId: senderId,
                        },
                    },
                });
                return user;
            }
            return { error: "null" };
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async unsendFriendRequest(senderId, recieverId) {
        try {
            const user = await this.prisma.friendRequest.delete({
                where: {
                    Unique_Sender_Receiver: {
                        senderId: senderId,
                        receivedId: recieverId,
                    },
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
    async rejectFriendRequest(senderId, recieverId) {
        try {
            const user = await this.prisma.friendRequest.delete({
                where: {
                    Unique_Sender_Receiver: {
                        senderId: recieverId,
                        receivedId: senderId,
                    },
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
            await this.prisma.friend.deleteMany({
                where: {
                    OR: [
                        {
                            senderId: recieverId,
                            receivedId: senderId,
                        },
                        {
                            senderId: senderId,
                            receivedId: recieverId,
                        },
                    ],
                },
            });
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
            const user = await this.prisma.blockedUser.delete({
                where: {
                    Unique_Sender_Receiver: {
                        senderId: senderId,
                        receivedId: recieverId,
                    },
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
    async removeFriend(senderId, recieverId) {
        try {
            const friendToDelete = await this.prisma.friend.findMany({
                where: {
                    OR: [
                        {
                            senderId: recieverId,
                            receivedId: senderId,
                        },
                        {
                            senderId: senderId,
                            receivedId: recieverId,
                        },
                    ],
                },
            });
            for (const element of friendToDelete) {
                const user = await this.prisma.friend.delete({
                    where: {
                        id: element.id,
                    },
                });
                return user;
            }
            return friendToDelete;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async getGameHistory(senderUsr) {
        try {
            const allUsers = await this.prisma.user.findMany();
            const users = await this.prisma.gameHistory.findMany({
                where: {
                    OR: [
                        {
                            receiverUsr: senderUsr,
                        },
                        {
                            senderUsr: senderUsr,
                        },
                    ],
                },
            });
            const usersWithAvatar = users.map((user) => {
                const receiverAvatar = allUsers.find((item) => item.nickname === user.receiverUsr).profilePic;
                const senderAvatar = allUsers.find((item) => item.nickname === user.senderUsr).profilePic;
                return {
                    ...user,
                    receiverAvatar: receiverAvatar,
                    senderAvatar: senderAvatar,
                };
            });
            return usersWithAvatar;
        }
        catch (error) {
            console.log("error:", error);
            return [];
        }
    }
    isWined(record, isWined, user) {
        let senderUsr = record.receiverUsr;
        let receiverUsr = record.senderUsr;
        let senderPoints = record.senderPoints;
        let receiverPoints = record.receiverPoints;
        if (isWined) {
            senderUsr = record.receiverUsr;
            receiverUsr = record.senderUsr;
            senderPoints = record.receiverPoints;
            receiverPoints = record.senderPoints;
        }
        if (senderUsr === user.nickname) {
            return parseInt(senderPoints) > parseInt(receiverPoints);
        }
        else if (receiverUsr === user.nickname) {
            return parseInt(senderPoints) < parseInt(receiverPoints);
        }
    }
    async getNbrOfMatches(recieverUsr, isWined) {
        const user = await this.getOneUser(recieverUsr);
        const gamesHistory = await this.getGameHistory(recieverUsr);
        let NbrOfMatches = 0;
        if (gamesHistory) {
            NbrOfMatches = gamesHistory.length;
            if (isWined === 1) {
                NbrOfMatches = gamesHistory.filter((record) => this.isWined(record, true, user)).length;
            }
            else if (isWined === 0) {
                NbrOfMatches = gamesHistory.filter((record) => this.isWined(record, false, user)).length;
            }
        }
        return NbrOfMatches;
    }
    catch(error) {
        return {
            error: error,
        };
    }
    async getGlobalInfos(recieverUsr) {
        try {
            const globInfo = {
                NbrOfAllMatches: 0,
                NbrOfWinnedMatches: 0,
                NbrOfLosedMatches: 0,
                NbrOfFriends: 0,
                NbrOfBlockedFriends: 0,
                NbrOfInvitedFriends: 0,
            };
            const user = await this.getOneUser(recieverUsr);
            const gamesHistory = await this.getGameHistory(recieverUsr);
            if (gamesHistory) {
                globInfo.NbrOfAllMatches = gamesHistory.length;
                globInfo.NbrOfWinnedMatches = gamesHistory.filter((record) => this.isWined(record, true, user)).length;
                globInfo.NbrOfLosedMatches = gamesHistory.filter((record) => this.isWined(record, false, user)).length;
            }
            const allFriends = await this.getAllFriends(user.id);
            if (allFriends) {
                globInfo.NbrOfFriends = allFriends.length;
            }
            const allBlocked = await this.getBlockedFriends(user.id);
            if (allBlocked) {
                globInfo.NbrOfBlockedFriends = allBlocked.length;
            }
            const allInvited = await this.getPendingFriends(user.id);
            if (allInvited) {
                globInfo.NbrOfInvitedFriends = allInvited.length;
            }
            return globInfo;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async getUserRanking(senderUsr) {
        try {
            const allUsers = await this.prisma.user.findMany();
            const usersRank = await Promise.all(allUsers.map(async (user) => {
                const userRank = await this.getNbrOfMatches(user.nickname, 1);
                return {
                    userName: user.nickname,
                    winedGames: userRank,
                };
            }));
            const sortedData = usersRank.sort((a, b) => b.winedGames - a.winedGames);
            let userRank = { userName: senderUsr, rank: 0 };
            sortedData.map((item, index) => {
                if (senderUsr === item.userName) {
                    userRank.rank = index + 1;
                }
            });
            return userRank;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async updateGameHistory(senderUsr, recieverUsr, senderPt, recieverPt) {
        try {
            const user = await this.prisma.gameHistory.create({
                data: {
                    senderUsr: senderUsr,
                    receiverUsr: recieverUsr,
                    senderPoints: senderPt,
                    receiverPoints: recieverPt,
                },
            });
            if (parseInt(senderPt) > parseInt(recieverPt)) {
                this.updateLevelAfterGame(senderUsr, "0.23");
            }
            if (parseInt(senderPt) < parseInt(recieverPt)) {
                this.updateLevelAfterGame(recieverUsr, "0.23");
            }
            return user;
        }
        catch (error) {
            return {
                error: error,
            };
        }
    }
    async updateLevel(senderUsr, newLevel) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    nickname: senderUsr,
                },
                data: {
                    level: newLevel,
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
    async updateLevelAfterGame(senderUsr, incrLevelBy) {
        try {
            const userT = await this.prisma.user.findUnique({
                where: {
                    nickname: senderUsr,
                },
            });
            const currentLevel = parseFloat(userT.level);
            const level = currentLevel + parseFloat(incrLevelBy);
            const user = await this.prisma.user.update({
                where: {
                    nickname: senderUsr,
                },
                data: {
                    level: level.toFixed(2),
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
};
exports.HixcoderService = HixcoderService;
exports.HixcoderService = HixcoderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HixcoderService);
//# sourceMappingURL=hixcoder.service.js.map