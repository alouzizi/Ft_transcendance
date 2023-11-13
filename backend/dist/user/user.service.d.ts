import { PrismaService } from "src/prisma/prisma.service";
import { ChannelService } from "src/channel/channel.service";
export declare class UserService {
    private prisma;
    private channelService;
    constructor(prisma: PrismaService, channelService: ChannelService);
    findById(id: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    } | {
        error: boolean;
    }>;
    findAllUsers(): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: boolean;
    }>;
    getValideUsers(senderId: string): Promise<{
        friendship: number;
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: boolean;
    }>;
    usersCanJoinChannel(senderId: string, channelId: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: boolean;
    }>;
    checkIsBlocked(senderId: string, receivedId: string): Promise<0 | 1 | 2 | {
        error: boolean;
    }>;
    getUserGeust(id: string): Promise<{
        isUser: boolean;
        id: string;
        nickname: string;
        profilePic: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
        lenUser: number;
        idUserOwner: number;
        error?: undefined;
    } | {
        isUser: boolean;
        id: string;
        nickname: string;
        profilePic: string;
        status: string;
        lastSee: number;
        lenUser: number;
        idUserOwner: number;
        error?: undefined;
    } | {
        error: boolean;
        isUser?: undefined;
        id?: undefined;
        nickname?: undefined;
        profilePic?: undefined;
        status?: undefined;
        lastSee?: undefined;
        lenUser?: undefined;
        idUserOwner?: undefined;
    }>;
    getChannelGeust(id: string): Promise<{
        isUser: boolean;
        id: string;
        nickname: any;
        profilePic: any;
        status: "INACTIF";
        lastSee: any;
        lenUser: number;
        idUserOwner: any;
        error?: undefined;
    } | {
        error: boolean;
        isUser?: undefined;
        id?: undefined;
        nickname?: undefined;
        profilePic?: undefined;
        status?: undefined;
        lastSee?: undefined;
        lenUser?: undefined;
        idUserOwner?: undefined;
    }>;
    createUser(user1: any): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    findByIntraId(intra_id: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
}
