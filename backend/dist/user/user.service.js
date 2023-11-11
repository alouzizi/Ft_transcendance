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
const channel_service_1 = require("../channel/channel.service");
let UserService = class UserService {
    constructor(prisma, channelService) {
        this.prisma = prisma;
        this.channelService = channelService;
    }
    async findById(id) {
        return await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }
    async findAllUsers() {
        return await this.prisma.user.findMany();
    }
    async getValideUsers(senderId) {
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
                        {
                            senderId: senderId,
                            receivedId: user.id,
                        },
                        {
                            senderId: user.id,
                            receivedId: senderId,
                        },
                    ],
                },
            });
            if (friends)
                return { ...user, friendship: 1 };
            let freiReq = await this.prisma.friendRequest.findFirst({
                where: {
                    senderId: user.id,
                    receivedId: senderId,
                },
            });
            if (freiReq)
                return { ...user, friendship: 2 };
            let sendReq = await this.prisma.friendRequest.findFirst({
                where: {
                    senderId: senderId,
                    receivedId: user.id,
                },
            });
            if (sendReq)
                return { ...user, friendship: 3 };
            return { ...user, friendship: 0 };
        }));
        return result;
    }
    async usersCanJoinChannel(senderId, channelId) {
        const users = await this.prisma.user.findMany();
        const blockerUsers = await this.prisma.blockedUser.findMany({
            where: {
                OR: [{ senderId: senderId }, { receivedId: senderId }],
            },
        });
        const bannedUsersChannel = await this.prisma.bannedMember.findMany({
            where: { channelId: channelId }
        });
        const membersChannel = await this.prisma.channelMember.findMany({
            where: { channelId: channelId }
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
                return (banned.userId === user.id);
            });
            if (found)
                return false;
            return true;
        });
        const result = cleanUser2.filter((user) => {
            const found = membersChannel.find((banned) => {
                return (banned.userId === user.id);
            });
            if (found)
                return false;
            return true;
        });
        return result;
    }
    async checkIsBlocked(senderId, receivedId) {
        const block = await this.prisma.blockedUser.findFirst({
            where: {
                senderId: senderId,
                receivedId: receivedId
            }
        });
        if (block)
            return true;
        return false;
    }
    async getUserGeust(id) {
        const user = await this.findById(id);
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
            };
        return {
            isUser: true,
            id: '-1',
            nickname: '',
            profilePic: '',
            status: '',
            lastSee: 0,
            lenUser: 0,
            idUserOwner: 0,
        };
    }
    async getChannelGeust(id) {
        const channel = await this.channelService.findChannelById(id);
        const members = await this.prisma.channelMember.findMany({ where: { channelId: id } });
        return {
            isUser: false,
            id: channel.id,
            nickname: channel.channelName,
            profilePic: channel.avatar,
            status: client_1.Status.INACTIF,
            lastSee: channel.createdAt,
            lenUser: members.length,
            idUserOwner: channel.channelOwnerId
        };
    }
    async createUser(user1) {
        console.log("my user iss", user1.intra_id);
        const user = await this.prisma.user.create({
            data: {
                intra_id: user1.intra_id.toString(),
                nickname: user1.login42.toString(),
                email: user1.email.toString(),
                profilePic: user1.profilePicture.toString(),
                last_name: user1.last_name,
                first_name: user1.first_name
            },
        });
        console.log("prisma user is ", user);
        return user;
    }
    async findByIntraId(intra_id) {
        return this.prisma.user.findUnique({
            where: { intra_id: intra_id },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        channel_service_1.ChannelService])
], UserService);
//# sourceMappingURL=user.service.js.map