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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            return user;
        }
        catch (error) {
            return { error: true };
        }
    }
    async findAllUsers() {
        try {
            return await this.prisma.user.findMany();
        }
        catch (error) {
            return { error: true };
        }
    }
    async getValideUsers(senderId) {
        try {
            const users = await this.prisma.user.findMany();
            const blockerUsers = await this.prisma.blockedUser.findMany({
                where: {
                    OR: [{ senderId: senderId }, { receivedId: senderId }],
                },
            });
            const temp = users.filter((user) => {
                if (user.id === senderId)
                    return false;
                const found = blockerUsers.find((elm) => {
                    return ((senderId === elm.senderId && user.id === elm.receivedId) ||
                        (senderId === elm.receivedId && user.id === elm.senderId));
                });
                if (found)
                    return false;
                return true;
            });
            const result = await Promise.all(temp.map(async (user) => {
                let friends = await this.prisma.friend.findFirst({
                    where: {
                        OR: [
                            { senderId: senderId, receivedId: user.id },
                            { senderId: user.id, receivedId: senderId },
                        ],
                    },
                });
                if (friends)
                    return { ...user, friendship: 1 };
                let freiReq = await this.prisma.friendRequest.findFirst({
                    where: { senderId: user.id, receivedId: senderId },
                });
                if (freiReq)
                    return { ...user, friendship: 2 };
                let sendReq = await this.prisma.friendRequest.findFirst({
                    where: { senderId: senderId, receivedId: user.id },
                });
                if (sendReq)
                    return { ...user, friendship: 3 };
                return { ...user, friendship: 0 };
            }));
            return result;
        }
        catch (error) {
            return { error: true };
        }
    }
    async usersCanJoinChannel(senderId, channelId) {
        try {
            const users = await this.prisma.user.findMany();
            const blockerUsers = await this.prisma.blockedUser.findMany({
                where: {
                    OR: [{ senderId: senderId }, { receivedId: senderId }],
                },
            });
            const bannedUsersChannel = await this.prisma.bannedMember.findMany({
                where: { channelId: channelId },
            });
            const membersChannel = await this.prisma.channelMember.findMany({
                where: { channelId: channelId },
            });
            const cleanUser = users.filter((user) => {
                if (user.id === senderId)
                    return false;
                const found = blockerUsers.find((blk) => {
                    return ((senderId === blk.senderId && user.id === blk.receivedId) ||
                        (senderId === blk.receivedId && user.id === blk.senderId));
                });
                if (found)
                    return false;
                return true;
            });
            const cleanUser2 = cleanUser.filter((user) => {
                const found = bannedUsersChannel.find((banned) => {
                    return banned.userId === user.id;
                });
                if (found)
                    return false;
                return true;
            });
            const result = cleanUser2.filter((user) => {
                const found = membersChannel.find((banned) => {
                    return banned.userId === user.id;
                });
                if (found)
                    return false;
                return true;
            });
            return result;
        }
        catch {
            return { error: true };
        }
    }
    async checkIsBlocked(senderId, receivedId) {
        try {
            const block1 = await this.prisma.blockedUser.findFirst({
                where: {
                    senderId: senderId,
                    receivedId: receivedId,
                },
            });
            if (block1)
                return 1;
            const block2 = await this.prisma.blockedUser.findFirst({
                where: {
                    senderId: receivedId,
                    receivedId: senderId,
                },
            });
            if (block2)
                return 2;
            return 0;
        }
        catch (error) {
            return { error: true };
        }
    }
    async getUserGeust(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (user)
                return {
                    isUser: true,
                    id: user.id,
                    nickname: user.nickname,
                    profilePic: user.profilePic,
                    status: user.status,
                    lastSee: user.lastSee,
                    lenUser: 0,
                    idUserOwner: 0,
                    inGaming: user.inGaming,
                };
            return {
                isUser: true,
                id: "-1",
                nickname: "",
                profilePic: "",
                status: "",
                lastSee: 0,
                lenUser: 0,
                idUserOwner: 0,
            };
        }
        catch {
            return { error: true };
        }
    }
    async getChannelGeust(id) {
        try {
            const channel = await this.prisma.channel.findUnique({ where: { id } });
            const members = await this.prisma.channelMember.findMany({
                where: { channelId: id },
            });
            return {
                isUser: false,
                id: id,
                nickname: channel.channelName,
                profilePic: channel.avatar,
                status: client_1.Status.INACTIF,
                lastSee: channel.createdAt,
                lenUser: members.length,
                idUserOwner: channel.channelOwnerId,
            };
        }
        catch {
            return { error: true };
        }
    }
    async createUser(user1) {
        try {
            let nickname = user1.login42.toString();
            let i = 0;
            let check = await this.prisma.user.findUnique({
                where: { nickname: nickname },
            });
            while (check) {
                check = await this.prisma.user.findUnique({
                    where: { nickname: `${nickname}_${i}` },
                });
                nickname = `${nickname}_${i}`;
                i++;
            }
            const user = await this.prisma.user.create({
                data: {
                    intra_id: user1.intra_id.toString(),
                    nickname: nickname,
                    email: user1.email.toString(),
                    profilePic: user1.profilePicture.toString(),
                    last_name: user1.last_name,
                    first_name: user1.first_name,
                    isTwoFactorAuthEnabled: user1.isTwoFactorAuthEnabled || false,
                },
            });
            return user;
        }
        catch (error) { }
    }
    async setTwoFactorAuthSecret(secret, intra_id) {
        await this.prisma.user.update({
            where: { intra_id: intra_id },
            data: {
                twoFactorAuthSecret: secret,
            },
        });
    }
    async turnOnTwoFactorAuth(intra_id) {
        const user = await this.prisma.user.findUnique({
            where: { intra_id: intra_id },
        });
        await this.prisma.user.update({
            where: { intra_id: intra_id },
            data: {
                isTwoFactorAuthEnabled: true,
            },
        });
    }
    async turnOffTwoFactorAuth(intra_id) {
        const user = await this.prisma.user.findUnique({
            where: { intra_id: intra_id },
        });
        await this.prisma.user.update({
            where: { intra_id: intra_id },
            data: {
                isTwoFactorAuthEnabled: false,
            },
        });
    }
    async getUsers() {
        return this.prisma.user.findMany();
    }
    async updateNickname(intra_id, nickname) {
        const usr = await this.prisma.user.findUnique({ where: { intra_id } });
        if (usr.nickname === nickname) {
            return;
        }
        try {
            const user = await this.prisma.user.update({
                where: {
                    intra_id: intra_id,
                },
                data: {
                    nickname: nickname,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.HttpException("nickname aleady exist", common_1.HttpStatus.CONFLICT);
                }
                else {
                    return { status: 202, error: true };
                }
            }
        }
    }
    async uploadImage(intra_id, path) {
        try {
            await this.prisma.user.update({
                where: {
                    intra_id: intra_id,
                },
                data: {
                    profilePic: process.env.BACK_HOST + `/${path}`,
                },
            });
        }
        catch (error) { }
    }
    async findByIntraId(intra_id) {
        const user = await this.prisma.user.findUnique({
            where: { intra_id: intra_id },
        });
        return user;
    }
    async findByIds(id) {
        return await this.prisma.user.findUnique({
            where: { id: id },
        });
    }
    async deleteUser(id) {
        return await this.prisma.user.delete({
            where: { id: id },
        });
    }
    async startGameing(senderId) {
        await this.prisma.user.update({
            where: { id: senderId },
            data: { inGaming: true },
        });
    }
    async finishGaming(senderId) {
        await this.prisma.user.update({
            where: { id: senderId },
            data: { inGaming: false },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map