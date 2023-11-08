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
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("../messages/messages.service");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let GatewayService = class GatewayService {
    constructor(messagesService, prisma) {
        this.messagesService = messagesService;
        this.prisma = prisma;
    }
    async handleConnection(client, wss) {
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
                        wss.to(user.id.toString()).emit('updateData', {});
                    }
                }
                catch (error) {
                    console.error('Error while handling connection:', error);
                }
            }
        }
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        prisma_service_1.PrismaService])
], GatewayService);
//# sourceMappingURL=gateway.service.js.map