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
    async createMessageInfoChannel(senderId, channelId, userId, msg) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        await this.prisma.message.create({
            data: {
                senderId: senderId,
                receivedId: channelId,
                content: (user) ? `${msg} ${user.nickname}` : `${msg}`,
                isDirectMessage: false,
                InfoMessage: true,
                channelId: channelId,
            }
        });
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
            this.createMessageInfoChannel(senderId, newChannel.id, '', 'create group');
            await this.prisma.channelMember.create({
                data: {
                    userId: senderId,
                    isAdmin: true,
                    channelId: newChannel.id,
                }
            });
            createChannelDto.channelMember.forEach(async (item) => {
                await this.prisma.channelMember.create({
                    data: {
                        userId: item,
                        isAdmin: false,
                        channelId: newChannel.id,
                    }
                });
                this.createMessageInfoChannel(senderId, newChannel.id, item, 'added');
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
    async addUserToChannel(senderId, channelId, userId) {
        const admin = await this.prisma.channelMember.findUnique({
            where: {
                Unique_userId_channelId: { channelId, userId: senderId }
            },
        });
        if (admin.isAdmin) {
            await this.prisma.channelMember.create({
                data: {
                    userId: userId,
                    isAdmin: false,
                    channelId: channelId,
                }
            });
            this.createMessageInfoChannel(senderId, channelId, userId, "added");
        }
    }
    async getChannel(senderId, channelId) {
        const channel = await this.prisma.channel.findUnique({
            where: {
                id: channelId,
            },
        });
        return {
            channleName: channel.channelName,
            channelType: channel.channelType,
            protected: (channel.channelPassword === '') ? false : true,
            channlePassword: '8888',
            avatar: channel.avatar,
            channelOwnerId: channel.channelOwnerId
        };
    }
    async findChannelById(id) {
        return await this.prisma.channel.findUnique({
            where: {
                id: id,
            },
        });
    }
    async getMembersBanned(id) {
        let result = [];
        const members = await this.prisma.bannedMember.findMany({ where: { channelId: id } });
        for (const member of members) {
            const user = await this.prisma.user.findUnique({ where: { id: member.userId } });
            const temp = {
                userId: member.userId,
                nickname: user.nickname,
                profilePic: user.profilePic,
                role: 'banned',
                status: user.status,
            };
            result.push(temp);
        }
        result.sort((a, b) => {
            return a.nickname.localeCompare(b.nickname);
        });
        return (result);
    }
    async getRegularMembers(id) {
        let result = [];
        const channel = await this.prisma.channel.findUnique({ where: { id } });
        const members = await this.prisma.channelMember.findMany({ where: { channelId: id } });
        for (const member of members) {
            const user = await this.prisma.user.findUnique({ where: { id: member.userId } });
            const temp = {
                userId: member.userId,
                nickname: user.nickname,
                profilePic: user.profilePic,
                status: user.status,
                role: (member.userId === channel.channelOwnerId) ? "Owner"
                    : (member.isAdmin ? 'Admin' : 'User')
            };
            result.push(temp);
        }
        result.sort((a, b) => {
            return a.nickname.localeCompare(b.nickname);
        });
        return (result);
    }
    async getMembersChannel(id) {
        const bannedMembers = await this.getMembersBanned(id);
        const regularMembres = await this.getRegularMembers(id);
        return { bannedMembers, regularMembres };
    }
    async changeStatusAdmin(senderId, channelId, userId) {
        const admin = await this.prisma.channelMember.findUnique({
            where: {
                Unique_userId_channelId: { channelId, userId: senderId }
            },
        });
        const user = await this.prisma.channelMember.findUnique({
            where: {
                Unique_userId_channelId: { channelId, userId }
            },
        });
        if (admin.isAdmin) {
            const update = await this.prisma.channelMember.update({
                where: {
                    Unique_userId_channelId: { channelId, userId }
                },
                data: {
                    isAdmin: !user.isAdmin,
                },
            });
            return true;
        }
        return false;
    }
    async leaveChannel(senderId, channelId) {
        const channel = await this.prisma.channel.findUnique({
            where: { id: channelId }
        });
        const members = await this.prisma.channelMember.findMany({
            where: { channelId },
        });
        const user = await this.prisma.channelMember.findUnique({
            where: {
                Unique_userId_channelId: { channelId, userId: senderId }
            },
        });
        if (user) {
            await this.prisma.channelMember.delete({
                where: { Unique_userId_channelId: { channelId, userId: senderId } }
            });
            this.createMessageInfoChannel(senderId, channelId, '', 'leaved');
            if (members.length === 1) {
                await this.prisma.message.deleteMany({ where: { channelId } });
                await this.prisma.bannedMember.deleteMany({ where: { channelId } });
                await this.prisma.channel.delete({ where: { id: channelId } });
            }
            else {
                if (channel.channelOwnerId === senderId) {
                    let newOwner = await this.prisma.channelMember.findFirst({ where: { channelId, isAdmin: true } });
                    if (!newOwner) {
                        newOwner = await this.prisma.channelMember.findFirst({ where: { channelId } });
                    }
                    if (newOwner) {
                        const user = await this.prisma.user.findUnique({ where: { id: newOwner.userId } });
                        await this.prisma.channel.update({
                            where: { id: channelId },
                            data: {
                                channelOwnerId: newOwner.userId
                            }
                        });
                        await this.prisma.channelMember.update({
                            where: { Unique_userId_channelId: { channelId, userId: newOwner.userId } },
                            data: { isAdmin: true }
                        });
                    }
                }
            }
            return true;
        }
        return false;
    }
    async KickMember(senderId, channelId, userId) {
        const admin = await this.prisma.channelMember.findUnique({
            where: {
                Unique_userId_channelId: { channelId, userId: senderId }
            },
        });
        const user = await this.prisma.channelMember.findUnique({
            where: {
                Unique_userId_channelId: { channelId, userId }
            },
        });
        if (admin.isAdmin && user) {
            await this.prisma.channelMember.delete({
                where: { Unique_userId_channelId: { channelId, userId } }
            });
            this.createMessageInfoChannel(senderId, channelId, userId, 'kicked');
            return true;
        }
        return false;
    }
    async changeStatutsBanned(senderId, channelId, userId) {
        const admin = await this.prisma.channelMember.findUnique({
            where: {
                Unique_userId_channelId: { channelId, userId: senderId }
            },
        });
        if (admin.isAdmin) {
            const isEXIST = await this.prisma.bannedMember.findUnique({
                where: { Unique_userId_channelId: { channelId, userId } },
            });
            if (isEXIST) {
                await this.prisma.bannedMember.delete({
                    where: { Unique_userId_channelId: { channelId, userId } }
                });
                this.createMessageInfoChannel(senderId, channelId, userId, 'unbanned');
            }
            else {
                await this.prisma.bannedMember.create({
                    data: { userId, channelId }
                });
                await this.prisma.channelMember.delete({
                    where: { Unique_userId_channelId: { channelId, userId } }
                });
                this.createMessageInfoChannel(senderId, channelId, userId, 'banned');
            }
            return true;
        }
        return false;
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map