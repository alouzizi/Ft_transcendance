import { PrismaService } from "src/prisma/prisma.service";
import { globalInfoDto } from "./dto";
import { GameHistory, User } from "@prisma/client";
export declare class HixcoderService {
    private prisma;
    constructor(prisma: PrismaService);
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
    }[] | {
        error: any;
    }>;
    getOneUser(recieverId: string): Promise<{
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
    } | {
        error: any;
    }>;
    unblockFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
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
    getGameHistory(senderId: string): Promise<{
        receiverAvatar: string;
        senderAvatar: string;
        id: string;
        createdAt: Date;
        senderId: string;
        receiverId: string;
        senderPoints: string;
        receiverPoints: string;
    }[]>;
    isWined(record: GameHistory, isWined: boolean, user: User): boolean;
    getNbrOfMatches(recieverId: string, isWined: number): Promise<number>;
    catch(error: any): {
        error: any;
    };
    getGlobalInfos(recieverId: string): Promise<globalInfoDto | {
        error: any;
    }>;
    getUserRanking(senderId: string): Promise<{
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
    updateGameHistory(senderId: string, recieverUsr: string, senderPt: string, recieverPt: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receiverId: string;
        senderPoints: string;
        receiverPoints: string;
    } | {
        error: any;
    }>;
    updateLevel(senderId: string, newLevel: string): Promise<{
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
    updateLevelAfterGame(senderId: string, incrLevelBy: string): Promise<{
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
}
