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
let UserService = class UserService {
    constructor(prisma, messagesService) {
        this.prisma = prisma;
        this.messagesService = messagesService;
    }
    async findByEmail(email) {
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
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
    async getUserForMsg(senderId) {
        const users = await this.prisma.user.findMany();
        const usersMsg = await this.prisma.directMessage.findMany({
            where: {
                OR: [{ senderId: senderId }, { receivedId: senderId }],
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const distinctUserIds = new Set();
        for (const msg of usersMsg) {
            if (msg.senderId === senderId) {
                distinctUserIds.add(msg.receivedId);
            }
            else {
                distinctUserIds.add(msg.senderId);
            }
        }
        const idUsersArray = Array.from(distinctUserIds);
        const usersMsgList = idUsersArray.map((id) => users.find((user) => user.id === id));
        let lastMsgs = [];
        for (let i = 0; i < usersMsgList.length; i++) {
            const temp = await this.messagesService.getLastMessages(senderId, usersMsgList[i].id);
            lastMsgs.push(temp);
        }
        return { usersMsgList, lastMsgs };
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
        messages_service_1.MessagesService])
], UserService);
//# sourceMappingURL=user.service.js.map