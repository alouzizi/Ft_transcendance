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
const notification_service_1 = require("../notification/notification.service");
const crypto_js_1 = require("crypto-js");
let ChannelService = class ChannelService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.decryptMessage = (cipherText) => {
            try {
                const bytes = crypto_js_1.AES.decrypt(cipherText, process.env.CRYPTO_JS_KEY);
                const decrypted = bytes.toString(crypto_js_1.enc.Utf8);
                return decrypted;
            }
            catch (err) { }
        };
    }
    async createMessageInfoChannel(senderId, channelId, userId, msg) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        await this.prisma.message.create({
            data: {
                senderId: senderId,
                receivedId: channelId,
                content: user ? `${msg} ${user.nickname}` : `${msg}`,
                isDirectMessage: false,
                InfoMessage: true,
                channelId: channelId,
            },
        });
    }
    async createChannel(createChannelDto, senderId) {
        let cipherText = "";
        if (createChannelDto.channelPassword !== "")
            cipherText = crypto_js_1.AES.encrypt(createChannelDto.channelPassword, process.env.CRYPTO_JS_KEY);
        try {
            const newChannel = await this.prisma.channel.create({
                data: {
                    channelOwnerId: senderId,
                    channelName: createChannelDto.channelName,
                    channelPassword: cipherText.toString(),
                    channelType: createChannelDto.channelType,
                    protected: createChannelDto.protected,
                    avatar: "https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png",
                },
            });
            this.createMessageInfoChannel(senderId, newChannel.id, "", "create group");
            await this.prisma.channelMember.create({
                data: {
                    userId: senderId,
                    isAdmin: true,
                    channelId: newChannel.id,
                },
            });
            const promises = createChannelDto.channelMember.map(async (item) => {
                this.notificationService.createNotification({
                    senderId: senderId,
                    recieverId: item,
                    subject: "you've been invited to group",
                });
                await this.prisma.channelMember.create({
                    data: {
                        userId: item,
                        isAdmin: false,
                        channelId: newChannel.id,
                    },
                });
                this.createMessageInfoChannel(senderId, newChannel.id, item, "added");
            });
            await Promise.all(promises);
            return { ...newChannel, status: 200 };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return { status: 202, error: "Name is already used" };
                }
                else {
                    return { error: true };
                }
            }
        }
    }
    async updateChannel(senderId, channelId, updateChannelDto) {
        try {
            const memberAdmin = await this.prisma.channelMember.findFirst({
                where: {
                    channelId: channelId,
                    userId: senderId,
                    isAdmin: true,
                },
            });
            if (!memberAdmin)
                return { status: 204, error: "you are not admin" };
            let pass = "";
            if (updateChannelDto.channelPassword != "" && updateChannelDto.protected)
                pass = crypto_js_1.AES.encrypt(updateChannelDto.channelPassword, process.env.CRYPTO_JS_KEY);
            const channelUpdate = await this.prisma.channel.update({
                where: { id: channelId },
                data: {
                    channelName: updateChannelDto.channelName,
                    channelPassword: pass.toString(),
                    channelType: updateChannelDto.channelType,
                    protected: updateChannelDto.protected,
                    avatar: updateChannelDto.avatar,
                },
            });
            const userUpdate = await this.prisma.user.findUnique({
                where: { id: senderId },
            });
            this.createMessageInfoChannel(senderId, channelId, "", `${userUpdate.nickname}'s update in the channel.`);
            let pass2 = "";
            if (channelUpdate.channelPassword !== "")
                pass2 = this.decryptMessage(channelUpdate.channelPassword);
            return {
                status: 200,
                channel: {
                    ...channelUpdate,
                    channelPassword: pass2,
                },
            };
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return { status: 202, error: "Name is already used" };
                }
                else {
                    return { error: true };
                }
            }
        }
    }
    async uploadImageChannel(senderId, channelId, path) {
        try {
            const member = await this.prisma.channelMember.findFirst({
                where: { channelId: channelId, userId: senderId },
            });
            if (member.isAdmin) {
                await this.prisma.channel.update({
                    where: {
                        id: channelId,
                    },
                    data: {
                        avatar: process.env.BACK_HOST + `/${path}`,
                    },
                });
            }
        }
        catch (error) { }
    }
    async checkOwnerIsAdmin(senderId, channelId) {
        try {
            const user = await this.prisma.channelMember.findUnique({
                where: {
                    Unique_userId_channelId: { channelId, userId: senderId },
                },
            });
            if (user)
                return user.isAdmin;
        }
        catch (error) {
            return { error: true };
        }
    }
    async addUserToChannel(senderId, channelId, userId) {
        try {
            const admin = await this.prisma.channelMember.findUnique({
                where: {
                    Unique_userId_channelId: { channelId, userId: senderId },
                },
            });
            if (admin.isAdmin) {
                await this.prisma.channelMember.create({
                    data: {
                        userId: userId,
                        isAdmin: false,
                        channelId: channelId,
                    },
                });
                this.createMessageInfoChannel(senderId, channelId, userId, "added");
                this.notificationService.createNotification({
                    senderId: senderId,
                    recieverId: userId,
                    subject: "you've been invited to group",
                });
            }
        }
        catch (error) {
            return { error: true };
        }
    }
    async getChannel(senderId, channelId) {
        try {
            const channel = await this.prisma.channel.findUnique({
                where: {
                    id: channelId,
                },
            });
            if (channel) {
                let pass = "";
                if (channel.channelPassword !== "")
                    pass = this.decryptMessage(channel.channelPassword);
                return {
                    channelName: channel.channelName,
                    channelType: channel.channelType,
                    channelPassword: pass,
                    protected: channel.protected,
                    avatar: channel.avatar,
                    channelOwnerId: channel.channelOwnerId,
                };
            }
        }
        catch (error) {
            return { error: true };
        }
    }
    async findChannelById(id) {
        try {
            return await this.prisma.channel.findUnique({
                where: {
                    id: id,
                },
            });
        }
        catch (error) {
            return { error: true };
        }
    }
    async getMembersBanned(id) {
        let result = [];
        const members = await this.prisma.bannedMember.findMany({
            where: { channelId: id },
        });
        for (const member of members) {
            const user = await this.prisma.user.findUnique({
                where: { id: member.userId },
            });
            const temp = {
                userId: member.userId,
                nickname: user.nickname,
                profilePic: user.profilePic,
                role: "banned",
                status: user.status,
                unmuted_at: 0,
            };
            result.push(temp);
        }
        result.sort((a, b) => {
            return a.nickname.localeCompare(b.nickname);
        });
        return result;
    }
    async getRegularMembers(id) {
        let result = [];
        const channel = await this.prisma.channel.findUnique({ where: { id } });
        const members = await this.prisma.channelMember.findMany({
            where: { channelId: id },
        });
        for (const member of members) {
            const user = await this.prisma.user.findUnique({
                where: { id: member.userId },
            });
            const unmuted_at = await this.cancelTimeOut(member.userId, channel.id);
            const temp = {
                userId: member.userId,
                nickname: user.nickname,
                profilePic: user.profilePic,
                status: user.status,
                role: member.userId === channel.channelOwnerId
                    ? "Owner"
                    : member.isAdmin
                        ? "Admin"
                        : "User",
                unmuted_at,
            };
            result.push(temp);
        }
        result.sort((a, b) => {
            return a.nickname.localeCompare(b.nickname);
        });
        return result;
    }
    async getMembersChannel(id) {
        try {
            const bannedMembers = await this.getMembersBanned(id);
            const regularMembres = await this.getRegularMembers(id);
            return { bannedMembers, regularMembres };
        }
        catch (error) {
            return { error: true };
        }
    }
    async changeStatusAdmin(senderId, channelId, userId) {
        try {
            const admin = await this.prisma.channelMember.findUnique({
                where: {
                    Unique_userId_channelId: { channelId, userId: senderId },
                },
            });
            const user = await this.prisma.channelMember.findUnique({
                where: {
                    Unique_userId_channelId: { channelId, userId },
                },
            });
            if (admin.isAdmin) {
                const update = await this.prisma.channelMember.update({
                    where: {
                        Unique_userId_channelId: { channelId, userId },
                    },
                    data: {
                        isAdmin: !user.isAdmin,
                    },
                });
                return true;
            }
            return false;
        }
        catch (error) {
            return { error: true };
        }
    }
    async leaveChannel(senderId, channelId) {
        try {
            const channel = await this.prisma.channel.findUnique({
                where: { id: channelId },
            });
            const members = await this.prisma.channelMember.findMany({
                where: { channelId },
            });
            const user = await this.prisma.channelMember.findUnique({
                where: {
                    Unique_userId_channelId: { channelId, userId: senderId },
                },
            });
            if (user) {
                await this.prisma.channelMember.delete({
                    where: { Unique_userId_channelId: { channelId, userId: senderId } },
                });
                this.createMessageInfoChannel(senderId, channelId, "", "left");
                if (members.length === 1) {
                    await this.prisma.message.deleteMany({ where: { channelId } });
                    await this.prisma.bannedMember.deleteMany({ where: { channelId } });
                    await this.prisma.channel.delete({ where: { id: channelId } });
                }
                else {
                    if (channel.channelOwnerId === senderId) {
                        let newOwner = await this.prisma.channelMember.findFirst({
                            where: { channelId, isAdmin: true },
                        });
                        if (!newOwner) {
                            newOwner = await this.prisma.channelMember.findFirst({
                                where: { channelId },
                            });
                        }
                        if (newOwner) {
                            const user = await this.prisma.user.findUnique({
                                where: { id: newOwner.userId },
                            });
                            await this.prisma.channel.update({
                                where: { id: channelId },
                                data: {
                                    channelOwnerId: newOwner.userId,
                                },
                            });
                            await this.prisma.channelMember.update({
                                where: {
                                    Unique_userId_channelId: {
                                        channelId,
                                        userId: newOwner.userId,
                                    },
                                },
                                data: { isAdmin: true },
                            });
                        }
                    }
                }
                return true;
            }
            return false;
        }
        catch (error) {
            return { error: true };
        }
    }
    async KickMember(senderId, channelId, userId) {
        try {
            const admin = await this.prisma.channelMember.findUnique({
                where: {
                    Unique_userId_channelId: { channelId, userId: senderId },
                },
            });
            const user = await this.prisma.channelMember.findUnique({
                where: {
                    Unique_userId_channelId: { channelId, userId },
                },
            });
            if (admin.isAdmin && user) {
                await this.prisma.channelMember.delete({
                    where: { Unique_userId_channelId: { channelId, userId } },
                });
                this.createMessageInfoChannel(senderId, channelId, userId, "kicked");
                return true;
            }
            return false;
        }
        catch (error) {
            return { error: true };
        }
    }
    async checkUserIsInChannel(senderId, channelId) {
        try {
            const check = await this.prisma.channelMember.findFirst({
                where: { userId: senderId, channelId },
            });
            if (check)
                return true;
            return false;
        }
        catch (error) {
            return { error: true };
        }
    }
    async changeStatutsBanned(senderId, channelId, userId) {
        try {
            const admin = await this.prisma.channelMember.findUnique({
                where: {
                    Unique_userId_channelId: { channelId, userId: senderId },
                },
            });
            if (admin.isAdmin) {
                const isEXIST = await this.prisma.bannedMember.findUnique({
                    where: { Unique_userId_channelId: { channelId, userId } },
                });
                if (isEXIST) {
                    await this.prisma.bannedMember.delete({
                        where: { Unique_userId_channelId: { channelId, userId } },
                    });
                    this.createMessageInfoChannel(senderId, channelId, userId, "unbanned");
                }
                else {
                    await this.prisma.bannedMember.create({
                        data: { userId, channelId },
                    });
                    await this.prisma.channelMember.delete({
                        where: { Unique_userId_channelId: { channelId, userId } },
                    });
                    this.createMessageInfoChannel(senderId, channelId, userId, "banned");
                }
                return true;
            }
            return false;
        }
        catch (error) {
            return { error: true };
        }
    }
    async validePassword(senderId, channelId, password) {
        try {
            const channel = await this.prisma.channel.findUnique({
                where: { id: channelId },
            });
            let pass = "";
            if (channel.channelPassword !== "")
                pass = this.decryptMessage(channel.channelPassword);
            if (pass === password) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return { error: true };
        }
    }
    async checkIsBanner(senderId, channelId) {
        try {
            const bannedUser = await this.prisma.bannedMember.findFirst({
                where: { userId: senderId, channelId: channelId },
            });
            if (bannedUser)
                return true;
            return false;
        }
        catch (error) {
            return { error: true };
        }
    }
    async getValideChannels(senderId) {
        try {
            const publicChannels = await this.prisma.channel.findMany({
                where: { channelType: client_1.ChannelType.Public },
            });
            const result = await Promise.all(publicChannels
                .filter(async (channel) => {
                const test1 = await this.checkIsBanner(senderId, channel.id);
                return !test1;
            })
                .map(async (channel) => {
                let status = "user";
                const member = await this.prisma.channelMember.findFirst({
                    where: { userId: senderId, channelId: channel.id },
                });
                if (member)
                    status = "member";
                const muted = await this.prisma.mutedMember.findFirst({
                    where: { userId: senderId, channelId: channel.id },
                });
                if (muted)
                    status = "muted";
                return {
                    id: channel.id,
                    channelName: channel.channelName,
                    avatar: channel.avatar,
                    protected: channel.protected,
                    Status: status,
                };
            }));
            return result;
        }
        catch (error) {
            return { error: true };
        }
    }
    async joinChannel(senderId, channelId) {
        try {
            await this.prisma.channelMember.create({
                data: {
                    userId: senderId,
                    isAdmin: false,
                    channelId: channelId,
                },
            });
            this.createMessageInfoChannel(senderId, channelId, "", "join Channel");
        }
        catch (error) {
            return { error: true };
        }
    }
    async muteUserFromChannel(senderId, channelId, userId, timer) {
        try {
            const admin = await this.prisma.channelMember.findFirst({
                where: { userId: senderId, channelId: channelId },
            });
            if (admin && admin.isAdmin) {
                const user = await this.prisma.channelMember.findFirst({
                    where: { userId: userId, channelId: channelId },
                });
                if (user) {
                    const tm = parseInt(timer);
                    const mute = await this.prisma.mutedMember.create({
                        data: {
                            userId,
                            unmuted_at: new Date(new Date().getTime() + tm),
                            channelId: channelId,
                        },
                    });
                }
            }
        }
        catch (error) {
            return { error: true };
        }
    }
    async cancelTimeOutByAdmin(senderId, channelId, userId) {
        try {
            const admin = await this.prisma.channelMember.findFirst({
                where: {
                    userId: senderId,
                    channelId,
                },
            });
            if (admin && admin.isAdmin) {
                const muted = await this.prisma.mutedMember.findFirst({
                    where: { userId, channelId },
                });
                if (muted) {
                    await this.prisma.mutedMember.delete({ where: { id: muted.id } });
                }
            }
        }
        catch (error) {
            return { error: true };
        }
    }
    async cancelTimeOut(senderId, channelId) {
        const muted = await this.prisma.mutedMember.findFirst({
            where: {
                userId: senderId,
                channelId,
            },
        });
        if (muted) {
            const dt = new Date();
            if (muted.unmuted_at <= new Date()) {
                await this.prisma.mutedMember.delete({ where: { id: muted.id } });
                return 0;
            }
            return muted.unmuted_at.getTime() - dt.getTime();
        }
        return 0;
    }
    async checkIsMuted(senderId, channelId) {
        try {
            const muted = await this.prisma.mutedMember.findFirst({
                where: {
                    userId: senderId,
                    channelId,
                },
            });
            if (muted) {
                if (muted.unmuted_at < new Date()) {
                    await this.prisma.mutedMember.delete({ where: { id: muted.id } });
                    return -1;
                }
                const now = new Date();
                const result = muted.unmuted_at.getTime() - now.getTime();
                return result;
            }
            return -1;
        }
        catch (error) {
            return { error: true };
        }
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map