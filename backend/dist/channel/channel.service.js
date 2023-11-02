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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let ChannelService = class ChannelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createChannel(createChannelDto, senderId) {
        try {
            const newChannel = await this.prisma.channel.create({
                data: {
                    channelOwnerId: senderId,
                    channelName: createChannelDto.channleName,
                    channelPassword: createChannelDto.channlePassword,
                    channelType: createChannelDto.channelType,
                    avatar: "https://randomuser.me/api/portraits/women/82.jpg"
                }
            });
            await this.prisma.channelMember.create({
                data: {
                    userId: senderId,
                    isAdmin: true,
                    channelId: newChannel.id,
                }
            });
            await this.prisma.message.create({
                data: {
                    senderId: senderId,
                    receivedId: newChannel.id,
                    content: "create group",
                    isDirectMessage: false,
                    InfoMessage: true,
                    channelId: newChannel.id,
                }
            });
            createChannelDto.channelMember.forEach(async (item) => {
                const userAdd = await this.prisma.user.findUnique({ where: { id: item } });
                await this.prisma.channelMember.create({
                    data: {
                        userId: item,
                        isAdmin: false,
                        channelId: newChannel.id,
                    }
                });
                await this.prisma.message.create({
                    data: {
                        senderId: senderId,
                        receivedId: newChannel.id,
                        content: `added ${userAdd.nickname}`,
                        isDirectMessage: false,
                        InfoMessage: true,
                        channelId: newChannel.id,
                    }
                });
            });
            return newChannel;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return { status: 202, error: 'Name is already used' };
                }
                else {
                    console.error('Prisma error:', error);
                }
            }
        }
    }
    async findChannelById(id) {
        return await this.prisma.channel.findUnique({
            where: {
                id: id,
            },
        });
    }
    async getMembersChannel(id) {
        let result = [];
        const channel = await this.prisma.channel.findUnique({ where: { id } });
        const members = await this.prisma.channelMember.findMany({ where: { channelId: id } });
        for (const member of members) {
            const user = await this.prisma.user.findUnique({ where: { id: member.userId } });
            const temp = {
                userId: member.userId,
                nickname: user.nickname,
                profilePic: user.profilePic,
                status: (member.userId === channel.channelOwnerId) ? "Owner"
                    : (member.isAdmin ? 'Admin' : 'User')
            };
            result.push(temp);
        }
        return (result);
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map