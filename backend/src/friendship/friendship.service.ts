import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendshipService {
    constructor(private prisma: PrismaService
    ) { }

    async sendFriendRequist(sendId: string, recivedId: string) {
        let req = await this.prisma.friendRequest.findUnique({
            where: {
                Unique_Sender_Receiver: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            },
        });
        if (!req) {
            req = await this.prisma.friendRequest.create({
                data: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            });
        }
        return req;
    }



    async removeFriendRequist(sendId: string, recivedId: string) {
        let req = await this.prisma.friendRequest.deleteMany({
            where: {
                senderId: sendId,
                receivedId: recivedId,
            },
        });
        return req;
    }

    async accepteFriendRequest(sendId: string, recivedId: string) {
        let req = await this.prisma.friend.findUnique({
            where: {
                Unique_Sender_Receiver: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            },
        });
        if (!req) {
            req = await this.prisma.friend.create({
                data: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            });
        }
        return req;
    }
    async deleteFriend(sendId: string, recivedId: string) {
        let req = await this.prisma.friend.deleteMany({
            where: {
                OR: [
                    {
                        senderId: sendId,
                        receivedId: recivedId,
                    },
                    {
                        senderId: recivedId,
                        receivedId: sendId,
                    }
                ]
            },
        });
        return req;
    }
    async blockedUser(sendId: string, recivedId: string) {
        let req = await this.prisma.blockedUser.findUnique({
            where: {
                Unique_Sender_Receiver: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            },
        });
        if (!req) {
            req = await this.prisma.blockedUser.create({
                data: {
                    senderId: sendId,
                    receivedId: recivedId,
                },
            });
        }
        return req;
    }

    async unBlockedUser(sendId: string, recivedId: string) {
        let req = await this.prisma.blockedUser.deleteMany({
            where: {
                senderId: sendId,
                receivedId: recivedId,
            },
        });
        return req;
    }
    async getSendRequistFriends(senderId: string) {
        const sendRequests = await this.prisma.friendRequest.findMany({
            where: {
                senderId: senderId,
            },
        });
        return sendRequests;
    }

    async getRecivedRequistFriends(senderId: string) {
        const sendRequests = await this.prisma.friendRequest.findMany({
            where: {
                receivedId: senderId,
            },
        });
        return sendRequests;
    }

    async getFriends(senderId: string) {
        const sendRequests = await this.prisma.friend.findMany({
            where: {
                OR: [
                    {
                        senderId: senderId,
                    },
                    {
                        receivedId: senderId,
                    }
                ]
            },
        });
        return sendRequests;
    }

    async getBlockedUser(senderId: string) {
        const sendRequests = await this.prisma.blockedUser.findMany({
            where: {
                OR: [
                    {
                        senderId: senderId,
                    },
                    {
                        receivedId: senderId,
                    }
                ]
            },
        });
        return sendRequests;
    }
}
