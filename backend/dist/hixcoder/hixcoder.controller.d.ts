import { HixcoderService } from "./hixcoder.service";
export declare class HixcoderController {
    private hixcoderService;
    constructor(hixcoderService: HixcoderService);
    getallUsers(sender: string): Promise<{
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
    }[] | {
        error: any;
    }>;
    getOneUser(reciever: string): Promise<{
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
    getIsBlocked(sender: string, reciever: string): Promise<{
        isBlocked: boolean;
    }>;
    getOnlineFriends(sender: string): Promise<any[] | {
        error: any;
    }>;
    getAllFriends(sender: string): Promise<{
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
    getPendingFriends(sender: string): Promise<{
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
    getBlockedFriends(sender: string): Promise<any[]>;
    getAllPossibleFriends(sender: string): Promise<{
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
    }[] | {
        error: any;
    }>;
    getNavSearchUsers(sender: string): Promise<{
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
    }[] | {
        error: any;
    }>;
    sendFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    acceptFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    unsendFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    rejectFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    blockFriend(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    unblockFriend(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    removeFriend(sender: string, reciever: string): Promise<{
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
    getGameHistory(sender: string): Promise<{
        receiverAvatar: string;
        senderAvatar: string;
        id: string;
        createdAt: Date;
        senderUsr: string;
        receiverUsr: string;
        senderPoints: string;
        receiverPoints: string;
    }[]>;
    getGlobalInfos(recieverUsr: string): Promise<import("./dto").globalInfoDto | {
        error: any;
    }>;
    getUserRanking(senderUsr: string): Promise<{
        userName: string;
        rank: number;
    } | {
        error: any;
    }>;
    getLeaderBoard(): Promise<{
        userName: string;
        userAvatar: string;
        level: string;
        nbrOfMatches: string;
        winRate: string;
        rank: string;
    }[] | {
        error: any;
    }>;
    updateLevel(sender: string, newLevel: string): Promise<{
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
    } | {
        error: any;
    }>;
    updateGameHistory(senderUsr: string, recieverUsr: string, senderPt: string, recieverPt: string): Promise<{
        id: string;
        createdAt: Date;
        senderUsr: string;
        receiverUsr: string;
        senderPoints: string;
        receiverPoints: string;
    } | {
        error: any;
    }>;
}
