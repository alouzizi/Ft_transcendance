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
const bcrypt = require("bcrypt");
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
        let bcryptPassword = '';
        if (createChannelDto.channelPassword != '')
            bcryptPassword = await bcrypt.hash(createChannelDto.channelPassword, 10);
        try {
            const newChannel = await this.prisma.channel.create({
                data: {
                    channelOwnerId: senderId,
                    channelName: createChannelDto.channelName,
                    channelPassword: bcryptPassword,
                    channelType: createChannelDto.channelType,
                    protected: createChannelDto.protected,
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
            return { ...newChannel, status: 200 };
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
    async updateChannel(senderId, channelId, updateChannelDto) {
        const saltRounds = 10;
        let pass = '';
        if (updateChannelDto.channelPassword != '' && updateChannelDto.protected)
            pass = await bcrypt.hash(updateChannelDto.channelPassword, saltRounds);
        try {
            const channelUpdate = await this.prisma.channel.update({
                where: { id: channelId },
                data: {
                    channelName: updateChannelDto.channelName,
                    channelPassword: pass,
                    channelType: updateChannelDto.channelType,
                    protected: updateChannelDto.protected,
                    avatar: updateChannelDto.avatar
                }
            });
            return {
                status: 200, channel: { ...channelUpdate, channelPassword: channelUpdate.protected ? '****' : '' }
            };
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
    async checkOwnerIsAdmin(senderId, channelId) {
        const user = await this.prisma.channelMember.findUnique({
            where: {
                Unique_userId_channelId: { channelId, userId: senderId }
            },
        });
        if (user)
            return (user.isAdmin);
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
        if (channel)
            return {
                channelName: channel.channelName,
                channelType: channel.channelType,
                channelPassword: channel.protected ? '****' : '',
                protected: channel.protected,
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
                unmuted_at: 0,
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
            this.deleteMuted(member.userId, channel.id);
            let unmuted_at = 0;
            const user = await this.prisma.user.findUnique({ where: { id: member.userId } });
            const muted = await this.prisma.mutedMember.findFirst({ where: { userId: member.userId, channelId: channel.id } });
            const now = new Date();
            if (muted) {
                unmuted_at = (muted.unmuted_at.getTime() - now.getTime());
            }
            const temp = {
                userId: member.userId,
                nickname: user.nickname,
                profilePic: user.profilePic,
                status: user.status,
                role: (member.userId === channel.channelOwnerId) ? "Owner"
                    : (member.isAdmin ? 'Admin' : 'User'),
                unmuted_at,
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
            this.createMessageInfoChannel(senderId, channelId, '', 'left');
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
    async validePassword(senderId, channelId, password) {
        const channel = await this.prisma.channel.findUnique({ where: { id: channelId } });
        const passwordMatch = await bcrypt.compare(password, channel.channelPassword);
        console.log(passwordMatch);
        if (passwordMatch) {
            return true;
        }
        else {
            return false;
        }
    }
    async checkIsBanner(senderId, channelId) {
        const bannedUser = await this.prisma.bannedMember.findFirst({
            where: { userId: senderId, channelId: channelId }
        });
        if (bannedUser)
            return true;
        return false;
    }
    async getValideChannels(senderId) {
        const publicChannels = await this.prisma.channel.findMany({ where: { channelType: client_1.ChannelType.Public } });
        const result = await Promise.all(publicChannels
            .filter(async (channel) => {
            const test1 = await this.checkIsBanner(senderId, channel.id);
            return !test1;
        })
            .map(async (channel) => {
            let status = 'user';
            const member = await this.prisma.channelMember.findFirst({
                where: { userId: senderId, channelId: channel.id }
            });
            if (member)
                status = "member";
            const muted = await this.prisma.mutedMember.findFirst({
                where: { userId: senderId, channelId: channel.id }
            });
            if (muted)
                status = "muted";
            return {
                id: channel.id,
                channelName: channel.channelName,
                avatar: channel.avatar,
                protected: channel.protected,
                Status: status
            };
        }));
        return result;
    }
    async joinChannel(senderId, channelId) {
        await this.prisma.channelMember.create({
            data: {
                userId: senderId,
                isAdmin: false,
                channelId: channelId,
            }
        });
        this.createMessageInfoChannel(senderId, channelId, '', "join Channel");
    }
    async muteUserChannel(senderId, channelId, userId, timer) {
        const admin = await this.prisma.channelMember.findFirst({ where: { userId: senderId, channelId: channelId } });
        if (admin && admin.isAdmin) {
            const user = await this.prisma.channelMember.findFirst({ where: { userId: userId, channelId: channelId } });
            if (user) {
                const tm = parseInt(timer);
                const mute = await this.prisma.mutedMember.create({
                    data: {
                        userId,
                        unmuted_at: new Date((new Date()).getTime() + tm),
                        channelId: channelId,
                    }
                });
            }
        }
    }
    async deleteMuted(senderId, channelId) {
        const muted = await this.prisma.mutedMember.findFirst({
            where: {
                userId: senderId,
                channelId,
            }
        });
        if (muted) {
            const dt = new Date();
            if (muted.unmuted_at < new Date()) {
                await this.prisma.mutedMember.delete({ where: { id: muted.id } });
            }
        }
    }
    async checkIsMuted(senderId, channelId) {
        const muted = await this.prisma.mutedMember.findFirst({
            where: {
                userId: senderId,
                channelId,
            }
        });
        if (muted) {
            const dt = new Date();
            if (muted.unmuted_at < new Date()) {
                await this.prisma.mutedMember.delete({ where: { id: muted.id } });
                return -1;
            }
            const now = new Date();
            const result = (muted.unmuted_at.getTime() - now.getTime());
            return result;
        }
        return -1;
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map