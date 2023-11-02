import { PrismaService } from "src/prisma/prisma.service";
export declare class HixcoderService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(senderId: number): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    getOnlineFriends(senderId: number): Promise<any[] | {
        error: any;
    }>;
    getAllFriends(senderId: number): Promise<any[] | {
        error: any;
    }>;
    getPendingFriends(senderId: number): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    getBlockedFriends(senderId: number): Promise<any[] | {
        error: any;
    }>;
    sendFriendRequest(senderId: number, recieverId: number): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    blockFriend(senderId: number, recieverId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    unblockFriend(senderId: number, recieverId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    removeFriend(senderId: number, recieverId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    test_giveFriendsToUser(userId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }[]>;
    test_createManyUsers(): Promise<void>;
}
