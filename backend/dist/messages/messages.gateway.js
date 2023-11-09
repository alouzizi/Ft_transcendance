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
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_service_1 = require("./messages.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const user_service_1 = require("../user/user.service");
let MessagesGateway = class MessagesGateway {
    constructor(messagesService, prisma, userService) {
        this.messagesService = messagesService;
        this.prisma = prisma;
        this.userService = userService;
    }
    afterInit(server) {
        console.log("Gateway Initialized");
    }
    async handleConnection(client, ...args) {
        console.log(`Client connected:--------------------------------------- ---> ${client.id}`);
        if (typeof client.handshake.query.senderId === "string") {
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
                        where: {
                            id: senderId,
                        },
                        data: {
                            status: client_1.Status.ACTIF,
                        },
                    });
                    await this.prisma.directMessage.updateMany({
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
                        this.wss.to(user.id.toString()).emit("updateData", {});
                    }
                }
                catch (error) {
                    console.error("Error while handling connection:", error);
                }
            }
        }
    }
    async handleDisconnect(client) {
        console.log(`Client disconnected: ---> ${client.id}`);
        if (typeof client.handshake.query.senderId === "string") {
            await this.prisma.user.update({
                where: {
                    id: client.handshake.query.senderId,
                },
                data: {
                    status: client_1.Status.INACTIF,
                    lastSee: new Date(),
                },
            });
            const users = await this.prisma.user.findMany();
            for (let i = 0; i < users.length; i++) {
                this.wss.to(users[i].id.toString()).emit("updateData", {});
            }
        }
    }
    async create(createMessageDto) {
        await this.messagesService.create(this.wss, createMessageDto);
    }
    async updateData(ids) {
        this.wss.to(ids.senderId.toString()).emit("updateData", {});
        this.wss.to(ids.receivedId.toString()).emit("updateData", {});
    }
    async isTyping(ids) {
        this.wss.to(ids.receivedId.toString()).emit("isTyping", ids);
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("createMessage"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updateData"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "updateData", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("isTyping"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "isTyping", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        prisma_service_1.PrismaService,
        user_service_1.UserService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map