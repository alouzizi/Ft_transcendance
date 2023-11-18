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
exports.SocketGatewayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let SocketGatewayService = class SocketGatewayService {
    constructor(prisma) {
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
    async handleDisconnect(client, wss) {
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
                wss.to(users[i].id).emit('updateData', {});
            }
        }
    }
    async updateData(ids, wss) {
        wss.to(ids.senderId).emit('updateData', {});
        if (ids.isDirectMessage === false) {
            const channelMembers = await this.prisma.channelMember.findMany({ where: { channelId: ids.receivedId } });
            for (const member of channelMembers) {
                wss.to(member.userId).emit('updateData', {});
            }
        }
        else
            wss.to(ids.receivedId).emit('updateData', {});
    }
};
exports.SocketGatewayService = SocketGatewayService;
exports.SocketGatewayService = SocketGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SocketGatewayService);
//# sourceMappingURL=socket.service.js.map