import { PrismaService } from "src/prisma/prisma.service";
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
    getAllUsers(senderId: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getUserByNick(recieverUsr: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    getIsBlocked(recieverId: string, senderId: string): Promise<{
        isBlocked: boolean;
    }>;
    getOnlineFriends(senderId: string): Promise<any[]>;
    getAllFriends(senderId: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
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
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getNavSearchUsers(senderId: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    sendFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }>;
    acceptFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: string;
    }>;
    unsendFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }>;
    rejectFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }>;
    blockFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }>;
    unblockFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }>;
    removeFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        id: string;
        senderId: string;
        receivedId: string;
    }[]>;
}
