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
exports.Gateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const messages_service_1 = require("../messages/messages.service");
const create_message_dto_1 = require("../messages/dto/create-message.dto");
let Gateway = class Gateway {
    constructor(messagesService, prisma) {
        this.messagesService = messagesService;
        this.prisma = prisma;
    }
    afterInit(server) {
        console.log('Gateway Initialized');
    }
    async handleConnection(client) {
        console.log(`Client connected:--------------------------------------- ---> ${client.id}`);
        if (typeof client.handshake.query.senderId === 'string') {
            client.join(client.handshake.query.senderId);
            const senderId = client.handshake.query.senderId;
            const userExists = await this.prisma.user.findUnique({
                where: {
                    id: senderId,
                },
            });
            if (userExists) {
                try {
                    await this.prisma.user.update({
                        where: { id: senderId },
                        data: {
                            status: client_1.Status.ACTIF,
                        },
                    });
                    await this.prisma.message.updateMany({
                        where: {
                            receivedId: senderId,
                            messageStatus: client_1.MessageStatus.NotReceived,
                        },
                        data: {
                            messageStatus: client_1.MessageStatus.Received,
                        },
                    });
                    const activeUsers = await this.prisma.user.findMany({
                        where: {
                            status: client_1.Status.ACTIF,
                        },
                    });
                    for (const user of activeUsers) {
                        this.wss.to(user.id.toString()).emit('updateData', {});
                    }
                }
                catch (error) {
                    console.error('Error while handling connection:', error);
                }
            }
        }
    }
    async handleDisconnect(client) {
        console.log(`Client disconnected: ---> ${client.id}`);
        if (typeof client.handshake.query.senderId === 'string') {
            await this.prisma.user.update({
                where: {
                    id: client.handshake.query.senderId
                },
                data: {
                    status: client_1.Status.INACTIF,
                    lastSee: new Date()
                }
            });
            const users = await this.prisma.user.findMany();
            for (let i = 0; i < users.length; i++) {
                this.wss.to(users[i].id).emit('updateData', {});
            }
        }
    }
    async createMessage(createMessageDto) {
        await this.messagesService.createMessage(this.wss, createMessageDto);
    }
    async updateData(ids) {
        this.wss.to(ids.senderId).emit('updateData', {});
        if (ids.isDirectMessage === false) {
            const channelMembers = await this.prisma.channelMember.findMany({ where: { channelId: ids.receivedId } });
            for (const member of channelMembers) {
                this.wss.to(member.userId).emit('updateData', {});
            }
        }
        else
            this.wss.to(ids.receivedId).emit('updateData', {});
    }
    async isTyping(ids) {
        this.wss.to(ids.receivedId).emit('isTyping', ids);
    }
};
exports.Gateway = Gateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], Gateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "createMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "updateData", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('isTyping'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "isTyping", null);
exports.Gateway = Gateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        prisma_service_1.PrismaService])
], Gateway);
//# sourceMappingURL=gateway.gateway.js.map