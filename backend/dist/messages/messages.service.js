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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDirectMessage(server, createMessageDto) {
        let notSendTo = "";
        let messageStatus = "NotReceived";
        const blockerUser = await this.prisma.blockedUser.findFirst({
            where: {
                OR: [
                    {
                        senderId: createMessageDto.senderId,
                        receivedId: createMessageDto.receivedId
                    },
                    {
                        senderId: createMessageDto.receivedId,
                        receivedId: createMessageDto.senderId
                    }
                ]
            }
        });
        if (blockerUser) {
            if (blockerUser.senderId === createMessageDto.senderId)
                notSendTo += blockerUser.receivedId;
            else
                notSendTo += blockerUser.senderId;
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: createMessageDto.receivedId,
            }
        });
        if (user.status === "ACTIF" && notSendTo === "")
            messageStatus = "Received";
        const msg = await this.prisma.message.create({
            data: {
                ...createMessageDto,
                receivedId: createMessageDto.receivedId,
                notSendTo,
                messageStatus,
                InfoMessage: false
            },
        });
        const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
        const receivedUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
        const temp = {
            isDirectMessage: true,
            InfoMessage: false,
            senderId: msg.senderId,
            senderName: senderUser.nickname,
            senderPic: senderUser.profilePic,
            contentMsg: msg.content,
            createdAt: msg.createdAt,
            messageStatus: msg.messageStatus,
            receivedId: msg.receivedId,
            receivedName: receivedUser.nickname,
            receivedPic: receivedUser.profilePic,
            receivedStatus: receivedUser.status,
            OwnerChannelId: '',
        };
        if (notSendTo === "")
            server.to(msg.receivedId).emit('findMsg2UsersResponse', temp);
        server.to(msg.senderId).emit('findMsg2UsersResponse', temp);
    }
    async createChannelMessage(server, createMessageDto) {
        let notSendTo = "";
        const channel = await this.prisma.channel.findUnique({ where: { id: createMessageDto.receivedId } });
        const channelMember = await this.prisma.channelMember.findMany({ where: { channelId: createMessageDto.receivedId } });
        const senderUser = await this.prisma.user.findUnique({ where: { id: createMessageDto.senderId } });
        const usersBlocked = await this.prisma.blockedUser.findMany({
            where: {
                OR: [
                    { senderId: senderUser.id },
                    { receivedId: senderUser.id },
                ],
            }
        });
        for (const block of usersBlocked) {
            if (block.senderId === createMessageDto.senderId)
                notSendTo = notSendTo + block.receivedId + ";";
            else
                notSendTo = notSendTo + block.senderId + ";";
        }
        const msg = await this.prisma.message.create({
            data: {
                ...createMessageDto,
                channelId: createMessageDto.receivedId,
                senderId: createMessageDto.senderId,
                isDirectMessage: false,
                notSendTo,
            },
        });
        for (const member of channelMember) {
            if (msg.notSendTo.includes(member.userId))
                continue;
            const temp = {
                isDirectMessage: false,
                InfoMessage: false,
                senderId: msg.senderId,
                senderName: senderUser.nickname,
                senderPic: senderUser.profilePic,
                contentMsg: msg.content,
                createdAt: msg.createdAt,
                messageStatus: client_1.MessageStatus.NotReceived,
                receivedId: msg.receivedId,
                receivedName: channel.channelName,
                receivedPic: channel.avatar,
                receivedStatus: client_1.Status.INACTIF,
                OwnerChannelId: channel.channelOwnerId,
            };
            server.to(member.userId).emit('findMsg2UsersResponse', temp);
        }
    }
    async createMessage(server, createMessageDto) {
        if (createMessageDto.isDirectMessage == true)
            await this.createDirectMessage(server, createMessageDto);
        else
            await this.createChannelMessage(server, createMessageDto);
    }
    async getDirectMessage(senderId, receivedId) {
        const msgUserTemp = await this.prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId,
                        receivedId,
                    },
                    {
                        senderId: receivedId,
                        receivedId: senderId,
                    },
                ],
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        const msgUser = msgUserTemp.filter((msg) => (msg.notSendTo === "" || msg.senderId === senderId));
        const result = await Promise.all(msgUser.map(async (msg) => {
            const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
            const receivedUser = await this.prisma.user.findUnique({ where: { id: msg.receivedId } });
            const temp = {
                isDirectMessage: true,
                InfoMessage: msg.InfoMessage,
                senderId: msg.senderId,
                senderName: senderUser.nickname,
                senderPic: senderUser.profilePic,
                contentMsg: msg.content,
                createdAt: msg.createdAt,
                messageStatus: msg.messageStatus,
                receivedId: msg.receivedId,
                receivedName: receivedUser.nickname,
                receivedPic: receivedUser.profilePic,
                receivedStatus: receivedUser.status,
                OwnerChannelId: '',
            };
            return temp;
        }));
        return result;
    }
    async getChannelMessage(senderId, channelId) {
        const msgUserTemp = await this.prisma.message.findMany({
            where: {
                isDirectMessage: false,
                channelId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        const channel = await this.prisma.channel.findUnique({ where: { id: channelId } });
        const result = await Promise.all(msgUserTemp
            .filter((msg) => !msg.notSendTo.includes(senderId))
            .map(async (msg) => {
            const senderUser = await this.prisma.user.findUnique({ where: { id: msg.senderId } });
            const temp = {
                isDirectMessage: false,
                InfoMessage: msg.InfoMessage,
                senderId: msg.senderId,
                senderName: senderUser.nickname,
                senderPic: senderUser.profilePic,
                contentMsg: msg.content,
                createdAt: msg.createdAt,
                messageStatus: client_1.MessageStatus.NotReceived,
                receivedId: msg.receivedId,
                receivedName: channel.channelName,
                receivedPic: channel.avatar,
                receivedStatus: client_1.Status.INACTIF,
                OwnerChannelId: channel.channelOwnerId,
            };
            return temp;
        }));
        return result;
    }
    async getLastMessages(senderId, receivedId) {
        const lastMessage = await this.prisma.message.findFirst({
            where: {
                OR: [
                    {
                        senderId,
                        receivedId,
                    },
                    {
                        senderId: receivedId,
                        receivedId: senderId,
                    },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return lastMessage;
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
            const userSender = await this.prisma.user.findUnique({ where: { id: lastMessageChannel.senderId } });
            const temp = {
                isDirectMessage: false,
                InfoMessage: false,
                senderId: lastMessageChannel.senderId,
                senderName: userSender.nickname,
                senderPic: userSender.profilePic,
                contentMsg: lastMessageChannel.content,
                createdAt: lastMessageChannel.createdAt,
                messageStatus: lastMessageChannel.messageStatus,
                receivedId: channel.id,
                receivedName: channel.channelName,
                receivedPic: channel.avatar,
                receivedStatus: client_1.Status.INACTIF,
                OwnerChannelId: channel.channelOwnerId,
            };
            result.push(temp);
        }
        return result;
    }
    async getMessageForList(senderId) {
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
        let usersList = [];
        for (const id of idUsersArray) {
            const user = await this.prisma.user.findUnique({ where: { id } });
            usersList.push(user);
        }
        for (const user of usersList) {
            const lastMessage = await this.getLastMessages(senderId, user.id);
            const tmp = {
                isDirectMessage: true,
                InfoMessage: false,
                senderId: '',
                senderName: '',
                senderPic: '',
                contentMsg: lastMessage.content,
                createdAt: lastMessage.createdAt,
                messageStatus: lastMessage.messageStatus,
                receivedId: user.id,
                receivedName: user.nickname,
                receivedPic: user.profilePic,
                receivedStatus: user.status,
                OwnerChannelId: '',
            };
            resultDirect.push(tmp);
        }
        const result = [...resultDirect, ...resultChannel];
        result.sort((a, b) => {
            const myDate1 = new Date(a.createdAt);
            const myDate2 = new Date(b.createdAt);
            return myDate2.getTime() - myDate1.getTime();
        });
        return result;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map