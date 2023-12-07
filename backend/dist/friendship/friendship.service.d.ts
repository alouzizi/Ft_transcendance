import { PrismaService } from "src/prisma/prisma.service";
export declare class FriendshipService {
    private prisma;
    constructor(prisma: PrismaService);
    unBlockedUser_2(sendId: string, recivedId: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        error: boolean;
    }>;
    getAllUsers(senderId: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        inGaming: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    getUserByNick(recieverUsr: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        inGaming: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    } | {
        error: any;
    }>;
    getIsBlocked(recieverId: string, senderId: string): Promise<{
        isBlocked: boolean;
        error?: undefined;
    } | {
        error: any;
        isBlocked?: undefined;
    }>;
    getOnlineFriends(senderId: string): Promise<any[] | {
        error: any;
    }>;
    getAllFriends(senderId: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        inGaming: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getPendingFriends(senderId: string): Promise<{
        isYouSender: boolean;
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        inGaming: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getBlockedFriends(senderId: string): Promise<any[]>;
    getAllPossibleFriends(senderId: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        inGaming: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    getNavSearchUsers(senderId: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        inGaming: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    sendFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    acceptFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    unsendFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    rejectFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    blockFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
        createdAt: Date;
    } | {
        error: any;
    }>;
    unblockFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
        createdAt: Date;
    } | {
        error: any;
    }>;
    removeFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        id: string;
        senderId: string;
        receivedId: string;
    }[] | {
        error: any;
    }>;
}
