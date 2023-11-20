import { FriendshipService } from "./friendship.service";
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    unBlockedUser(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        error: boolean;
    }>;
    getallUsers(sender: string): Promise<{
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
    getUserByNick(reciever: string): Promise<{
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
    }>;
    getIsBlocked(sender: string, reciever: string): Promise<{
        isBlocked: boolean;
    }>;
    getOnlineFriends(sender: string): Promise<any[]>;
    getAllFriends(sender: string): Promise<{
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
    getPendingFriends(sender: string): Promise<{
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
    getBlockedFriends(sender: string): Promise<any[]>;
    getAllPossibleFriends(sender: string): Promise<{
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
    getNavSearchUsers(sender: string): Promise<{
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
    sendFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }>;
    acceptFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: string;
    }>;
    unsendFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }>;
    rejectFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }>;
    blockFriend(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }>;
    unblockFriend(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }>;
    removeFriend(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        id: string;
        senderId: string;
        receivedId: string;
    }[]>;
}
