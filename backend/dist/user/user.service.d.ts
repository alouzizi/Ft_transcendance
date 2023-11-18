import { PrismaService } from "src/prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
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
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
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
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
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
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
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
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
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
        nickname: string;
        profilePic: string;
        status: "INACTIF";
        lastSee: Date;
        lenUser: number;
        idUserOwner: string;
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
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    setTwoFactorAuthSecret(secret: string, intra_id: string): Promise<void>;
    turnOnTwoFactorAuth(intra_id: string): Promise<void>;
    turnOffTwoFactorAuth(intra_id: string): Promise<void>;
    getUsers(): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    updatUserdata(intra_id: string, nickname: string, image: string): Promise<{
        status: number;
        error?: undefined;
    } | {
        status: number;
        error: boolean;
    }>;
    uploadImage(intra_id: string, path: string): Promise<{
        message: string;
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
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    findByIds(id: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        profilePic: string;
        hash: string;
        twoFactorAuth: boolean;
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        AsciiSecretQr: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
}
