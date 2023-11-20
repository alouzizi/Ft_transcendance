import { PrismaService } from "src/prisma/prisma.service";
import { BallDto, PaddleDto, globalInfoDto } from "./dto";
import { GameHistory, User } from "@prisma/client";
import { FriendshipService } from "src/friendship/friendship.service";
export declare class GameService {
    private friendshipService;
    private prisma;
    constructor(friendshipService: FriendshipService, prisma: PrismaService);
    getGameHistory(senderId: string): Promise<{
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
    isWined(record: GameHistory, isWined: boolean, user: User): boolean;
    getUserById(recieverId: string): Promise<{
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
    getNbrOfMatches(recieverId: string, isWined: number): Promise<number>;
    catch(error: any): {
        error: any;
    };
    getGlobalInfos(recieverId: string): Promise<globalInfoDto | {
        error: any;
    }>;
    getUserRanking(senderId: string): Promise<{
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
    updateLevel(senderId: string, newLevel: string): Promise<{
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
    updateLevelAfterGame(senderId: string, incrLevelBy: string): Promise<{
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
    collision(ball: any, player: any): boolean;
    resetBall(ball: BallDto): void;
    startGame(ball: BallDto, player1: PaddleDto, player2: PaddleDto): void;
}
