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
const notification_service_1 = require("../notification/notification.service");
let MessagesService = class MessagesService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async createMessage(server, createMessageDto) {
        if (createMessageDto.isDirectMessage == true)
            await this.createDirectMessage(server, createMessageDto);
        else
            await this.createChannelMessage(server, createMessageDto);
    }
    async createDirectMessage(server, createMessageDto) {
        try {
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
                nbrMessageNoRead: 0,
                OwnerChannelId: '',
                isChannProtected: false,
                inGaming: false,
                isBlocked: false
            };
            if (notSendTo === "") {
                server.to(msg.receivedId).emit('emitNewMessage', temp);
                this.notificationService.createNotification({
                    senderId: msg.senderId,
                    recieverId: msg.receivedId,
                    subject: "send message",
                });
            }
            server.to(msg.senderId).emit('emitNewMessage', temp);
        }
        catch (error) {
            return { error: true };
        }
    }
    async createChannelMessage(server, createMessageDto) {
        try {
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
                    nbrMessageNoRead: 0,
                    OwnerChannelId: channel.channelOwnerId,
                    isChannProtected: channel.protected,
                    inGaming: false,
                    isBlocked: false
                };
                server.to(member.userId).emit('emitNewMessage', temp);
            }
        }
        catch (error) {
            return { error: true };
        }
    }
    async getDirectMessage(senderId, receivedId) {
        try {
            const msgUserTemp = await this.prisma.message.findMany({
                where: {
                    OR: [{ senderId, receivedId },
                        { senderId: receivedId, receivedId: senderId },
                    ],
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });
            await this.prisma.message.updateMany({
                where: {
                    senderId: receivedId,
                    receivedId: senderId,
                },
                data: {
                    messageStatus: client_1.MessageStatus.Seen,
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
                    nbrMessageNoRead: 0,
                    OwnerChannelId: '',
                    isChannProtected: false,
                    inGaming: false,
                    isBlocked: (msg.notSendTo.length) ? true : false
                };
                return temp;
            }));
            return result;
        }
        catch (error) {
            return { error: true };
        }
    }
    async getChannelMessage(senderId, channelId) {
        try {
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
            const user = await this.prisma.channelMember.findFirst({ where: { userId: senderId, channelId } });
            if (user) {
                const result = await Promise.all(msgUserTemp
                    .filter((msg) => {
                    return (!msg.notSendTo.includes(senderId) && user.createdAt < msg.createdAt)
                        || (msg.content.includes('create') ||
                            msg.content.includes('add') ||
                            (msg.content.includes('create'))
                                && msg.InfoMessage == true);
                })
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
                        nbrMessageNoRead: 0,
                        OwnerChannelId: channel.channelOwnerId,
                        isChannProtected: channel.protected,
                        inGaming: false,
                        isBlocked: false
                    };
                    return temp;
                }));
                return result;
            }
        }
        catch (error) {
            return { error: true };
        }
    }
    async getLastMessages(senderId, receivedId) {
        const lastMessage = await this.prisma.message.findFirst({
            where: {
                OR: [
                    {
                        senderId,
                        receivedId,
                        notSendTo: ""
                    },
                    {
                        senderId: receivedId,
                        receivedId: senderId,
                        notSendTo: ""
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
        let myChannels = [];
        const channelMembers = await this.prisma.channelMember.findMany({
            where: {
                userId: senderId
            }
        });
        for (const ch of channelMembers) {
            const channel = await this.prisma.channel.findUnique({ where: { id: ch.channelId } });
            myChannels.push(channel);
        }
        for (const channel of myChannels) {
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
                nbrMessageNoRead: 0,
                OwnerChannelId: channel.channelOwnerId,
                isChannProtected: channel.protected,
                inGaming: false,
                isBlocked: false
            };
            result.push(temp);
        }
        const channlesPublic = await this.prisma.channel.findMany({
            where: { channelType: "Public" }
        });
        for (const chl of channlesPublic) {
            let find = false;
            for (const mych of myChannels) {
                if (mych.id === chl.id) {
                    find = true;
                    break;
                }
            }
            const bannedMember = await this.prisma.bannedMember.findMany({ where: { userId: senderId, channelId: chl.id } });
            if (find || bannedMember.length)
                continue;
            const temp = {
                isDirectMessage: false,
                InfoMessage: false,
                senderId: '',
                senderName: "",
                senderPic: "",
                contentMsg: "",
                createdAt: new Date(),
                messageStatus: "Received",
                receivedId: chl.id,
                receivedName: chl.channelName,
                receivedPic: chl.avatar,
                receivedStatus: client_1.Status.INACTIF,
                nbrMessageNoRead: 0,
                OwnerChannelId: chl.channelOwnerId,
                isChannProtected: chl.protected,
                inGaming: false,
                isBlocked: false
            };
            result.push(temp);
        }
        return result;
    }
    async getMessageForList(senderId) {
        try {
            let resultDirect = [];
            const resultChannel = await this.getChannleForMsg(senderId);
            const userToUersMsg = await this.prisma.message.findMany({
                where: {
                    OR: [
                        { senderId: senderId, isDirectMessage: true },
                        { receivedId: senderId, isDirectMessage: true }
                    ],
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
                const forNbrMessageNoRead = await this.prisma.message.findMany({
                    where: {
                        senderId: user.id,
                        receivedId: senderId,
                        notSendTo: "",
                        messageStatus: {
                            in: [client_1.MessageStatus.NotReceived, client_1.MessageStatus.Received],
                        },
                    }
                });
                const isblcked = await this.prisma.blockedUser.findMany({
                    where: {
                        OR: [{ senderId: senderId, receivedId: user.id },
                            { senderId: user.id, receivedId: senderId }]
                    }
                });
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
                    nbrMessageNoRead: isblcked.length ? 0 : forNbrMessageNoRead.length,
                    OwnerChannelId: '',
                    isChannProtected: false,
                    inGaming: user.inGaming,
                    isBlocked: isblcked.length ? true : false,
                };
                resultDirect.push(tmp);
            }
            const friends = await this.prisma.friend.findMany({
                where: {
                    OR: [
                        { senderId: senderId },
                        { receivedId: senderId },
                    ]
                }
            });
            for (const friend of friends) {
                let idU = "";
                if (senderId === friend.senderId)
                    idU = friend.receivedId;
                if (senderId === friend.receivedId)
                    idU = friend.senderId;
                if (idUsersArray.includes(idU))
                    continue;
                const user = await this.prisma.user.findUnique({ where: { id: idU } });
                const tmp = {
                    isDirectMessage: true,
                    InfoMessage: false,
                    senderId: '',
                    senderName: '',
                    senderPic: '',
                    contentMsg: "",
                    createdAt: new Date(),
                    messageStatus: "Received",
                    receivedId: user.id,
                    receivedName: user.nickname,
                    receivedPic: user.profilePic,
                    receivedStatus: user.status,
                    nbrMessageNoRead: 0,
                    OwnerChannelId: '',
                    isChannProtected: false,
                    inGaming: false,
                    isBlocked: false
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
        catch (error) {
            return { error: true };
        }
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map