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
const messages_service_1 = require("../messages/messages.service");
const client_1 = require("@prisma/client");
const channel_service_1 = require("../channel/channel.service");
let UserService = class UserService {
    constructor(prisma, messagesService, channelService) {
        this.prisma = prisma;
        this.messagesService = messagesService;
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
    async getChannleForMsg(senderId) {
        let result = [];
        let myChannel = [];
        const channelMembers = await this.prisma.channelMember.findMany({
            where: {
                userId: senderId
            }
        });
        for (const ch of channelMembers) {
            const channel = await this.prisma.channel.findUnique({ where: { id: ch.channelId } });
            myChannel.push(channel);
        }
        for (const channel of myChannel) {
            const lastMessageChannel = await this.prisma.message.findFirst({
                where: {
                    isDirectMessage: false,
                    channelId: channel.id,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            if (lastMessageChannel) {
                const userSender = await this.prisma.user.findUnique({ where: { id: lastMessageChannel.senderId } });
                const temp = {
                    isDirectMsg: false,
                    id: channel.id,
                    name: channel.channelName,
                    avatar: channel.avatar,
                    status: client_1.Status.INACTIF,
                    lastMsg: lastMessageChannel.content,
                    createdAt: lastMessageChannel.createdAt,
                    nameSenderChannel: userSender.nickname,
                };
                result.push(temp);
            }
        }
        return result;
    }
    async getUserForMsg(senderId) {
        let resultDirect = [];
        const resultChannel = await this.getChannleForMsg(senderId);
        const userToUersMsg = await this.prisma.message.findMany({
            where: {
                OR: [{ senderId: senderId, isDirectMessage: true },
                    { receivedId: senderId, isDirectMessage: true }],
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const distinctUserIds = new Set();
        for (const msg of userToUersMsg) {
            if (msg.senderId === senderId) {
                distinctUserIds.add(msg.receivedId);
            }
            else {
                distinctUserIds.add(msg.senderId);
            }
        }
        const idUsersArray = Array.from(distinctUserIds);
        let usersMsgList = [];
        for (const id of idUsersArray) {
            const user = await this.prisma.user.findUnique({ where: { id } });
            usersMsgList.push(user);
        }
        let lastMsgs = [];
        for (let i = 0; i < usersMsgList.length; i++) {
            const temp = await this.messagesService.getLastMessages(senderId, usersMsgList[i].id);
            lastMsgs.push(temp);
        }
        for (let i = 0; i < usersMsgList.length; i++) {
            const temp = {
                isDirectMsg: true,
                id: usersMsgList[i].id,
                name: usersMsgList[i].nickname,
                avatar: usersMsgList[i].profilePic,
                status: usersMsgList[i].status,
                lastMsg: lastMsgs[i].content,
                createdAt: lastMsgs[i].createdAt,
                nameSenderChannel: "null"
            };
            resultDirect.push(temp);
        }
        const result = [...resultDirect, ...resultChannel];
        result.sort((a, b) => {
            const myDate1 = new Date(a.createdAt);
            const myDate2 = new Date(b.createdAt);
            return myDate2.getTime() - myDate1.getTime();
        });
        return result;
    }
    async getUserGeust(id) {
        const user = await this.findById(id);
        return {
            isUser: true,
            id: user.id,
            nickname: user.nickname,
            profilePic: user.profilePic,
            status: user.status,
            lastSee: user.lastSee,
            lenUser: 0,
            lenUserLive: 0,
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
        messages_service_1.MessagesService,
        channel_service_1.ChannelService])
], UserService);
//# sourceMappingURL=user.service.js.map