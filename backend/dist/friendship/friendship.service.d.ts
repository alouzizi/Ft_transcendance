import { PrismaService } from 'src/prisma/prisma.service';
export declare class FriendshipService {
    private prisma;
    constructor(prisma: PrismaService);
    sendFriendRequist(sendId: string, recivedId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: boolean;
    }>;
    removeFriendRequist(sendId: string, recivedId: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        error: boolean;
    }>;
    accepteFriendRequest(sendId: string, recivedId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: boolean;
    }>;
    deleteFriend(sendId: string, recivedId: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        error: boolean;
    }>;
    blockedUser(sendId: string, recivedId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: boolean;
    }>;
    unBlockedUser(sendId: string, recivedId: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        error: boolean;
    }>;
    getSendRequistFriends(senderId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }[] | {
        error: boolean;
    }>;
    getRecivedRequistFriends(senderId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }[] | {
        error: boolean;
    }>;
    getFriends(senderId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[] | {
        error: boolean;
    }>;
    getBlockedUser(senderId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[] | {
        error: boolean;
    }>;
}
