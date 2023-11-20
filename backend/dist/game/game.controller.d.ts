import { GameService } from "./game.service";
export declare class GameController {
    private gameService;
    constructor(gameService: GameService);
    getGameHistory(sender: string): Promise<{
        receiverAvatar: string;
        senderAvatar: string;
        receiverUsr: string;
        senderUsr: string;
        id: string;
        createdAt: Date;
        senderId: string;
        receiverId: string;
        senderPoints: string;
        receiverPoints: string;
    }[]>;
    getGlobalInfos(recieverId: string): Promise<import("./dto").globalInfoDto | {
        error: any;
    }>;
    getUserRanking(recieverId: string): Promise<{
        userId: string;
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
    updateGameHistory(senderId: string, recieverId: string, senderPt: string, recieverPt: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receiverId: string;
        senderPoints: string;
        receiverPoints: string;
    } | {
        error: any;
    }>;
}
