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
let MessagesService = class MessagesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(server, createMessageDto) {
        let showed = true;
        let messageStatus = "NotReceived";
        const blockerUser = await this.prisma.blockedUser.findMany({
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
        if (blockerUser.length) {
            showed = false;
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: createMessageDto.receivedId,
            }
        });
        if (user.status === "ACTIF")
            messageStatus = "Received";
        const msg = await this.prisma.directMessage.create({
            data: {
                ...createMessageDto,
                showed,
                messageStatus
            },
        });
        if (showed)
            server.to(msg.receivedId.toString()).emit('findMsg2UsersResponse', msg);
        server.to(msg.senderId.toString()).emit('findMsg2UsersResponse', msg);
    }
    async getMessage(senderId, receivedId) {
        const msgUserTemp = await this.prisma.directMessage.findMany({
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
        const msgUser = msgUserTemp.filter((msg) => (msg.showed === true || senderId === msg.senderId));
        return msgUser;
    }
    async getLastMessages(senderId, receivedId) {
        const lastMessage = await this.prisma.directMessage.findFirst({
            where: {
                OR: [
                    {
                        senderId,
                        receivedId,
                        showed: true,
                    },
                    {
                        senderId: receivedId,
                        receivedId: senderId,
                        showed: true
                    },
                ],
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!lastMessage) {
            return {
                content: "",
                createdAt: 5
            };
        }
        return lastMessage;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map