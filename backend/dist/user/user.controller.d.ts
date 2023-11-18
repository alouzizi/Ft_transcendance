/// <reference types="multer" />
import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserProfile(id: string): Promise<{
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
        error: boolean;
    }>;
    getUserByIdintr(id_intra: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        profilePic: string;
        isTwoFactorAuthEnabled: boolean;
    }>;
    getAllUser(): Promise<{
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
        isTwoFactorAuthEnabled: boolean;
        twoFactorAuthSecret: string;
        level: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: boolean;
    }>;
    updatUserdata(intra_id: string, nickname: string): Promise<{
        status: number;
        error?: undefined;
    } | {
        status: number;
        error: boolean;
    }>;
    uploadImage(file: Express.Multer.File, senderId: string): Promise<{
        message: string;
    }>;
    getUsersCanJoinChannel(senderId: string, channelId: string): Promise<{
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
    checkIsBlocked(senderId: string, receivedId: string): Promise<0 | 1 | 2 | {
        error: boolean;
    }>;
}
