import { PrismaService } from "src/prisma/prisma.service";
export declare class FriendshipService {
    private prisma;
    constructor(prisma: PrismaService);
    sendFriendRequist(sendId: string, recivedId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }>;
    removeFriendRequist(sendId: string, recivedId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    accepteFriendRequest(sendId: string, recivedId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }>;
    deleteFriend(sendId: string, recivedId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    blockedUser(sendId: string, recivedId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }>;
    unBlockedUser(sendId: string, recivedId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getSendRequistFriends(senderId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }[]>;
    getRecivedRequistFriends(senderId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }[]>;
    getFriends(senderId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[]>;
    getBlockedUser(senderId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[]>;
}
