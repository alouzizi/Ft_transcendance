import { PrismaService } from "src/prisma/prisma.service";
export declare class FriendshipService {
    private prisma;
    constructor(prisma: PrismaService);
    sendFriendRequist(sendId: number, recivedId: number): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    }>;
    removeFriendRequist(sendId: number, recivedId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    accepteFriendRequest(sendId: number, recivedId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }>;
    deleteFriend(sendId: number, recivedId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    blockedUser(sendId: number, recivedId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }>;
    unBlockedUser(sendId: number, recivedId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getSendRequistFriends(senderId: number): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    }[]>;
    getRecivedRequistFriends(senderId: number): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    }[]>;
    getFriends(senderId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }[]>;
    getBlockedUser(senderId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }[]>;
}
