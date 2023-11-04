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
    getOneUser(recieverId: string): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    getOnlineFriends(senderId: number): Promise<any[] | {
        error: any;
    }>;
    getAllFriends(senderId: number): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getPendingFriends(senderId: number): Promise<{
        isYouSender: boolean;
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getBlockedFriends(senderId: number): Promise<any[] | {
        error: any;
    }>;
    getAllPossibleFriends(senderId: number): Promise<{
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
    sendFriendRequest(senderId: number, recieverId: number): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    acceptFriendRequest(senderId: number, recieverId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    unsendFriendRequest(senderId: number, recieverId: number): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    rejectFriendRequest(senderId: number, recieverId: number): Promise<{
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
        id: number;
        senderId: number;
        receivedId: number;
    }[] | {
        error: any;
    }>;
    test_giveFriendsToUser(userId: number): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }[]>;
    test_createManyUsers(): Promise<void>;
}
