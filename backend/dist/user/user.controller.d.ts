<<<<<<< HEAD
import { UserService } from "./user.service";
=======
import { UserService } from './user.service';
>>>>>>> implement the sockets successfully
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserProfile(id: string): Promise<{
        id: string;
<<<<<<< HEAD
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    getAllUser(): Promise<{
        id: string;
        email: string;
        username: string;
        hash: string;
        avatar: string;
=======
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
    getUserByIdintr(id_intra: string): Promise<{
        id: string;
        intra_id: string;
        first_name: string;
        last_name: string;
        nickname: string;
        profilePic: string;
    }>;
    getAllUser(): Promise<{
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
>>>>>>> implement the sockets successfully
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getValideUsers(senderId: string): Promise<{
        friendship: number;
        id: string;
<<<<<<< HEAD
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getUserForMsg(senderId: string): Promise<{
        usersMsgList: {
            id: string;
            email: string;
            username: string;
            hash: string;
            avatar: string;
            status: import(".prisma/client").$Enums.Status;
            lastSee: Date;
        }[];
        lastMsgs: any[];
=======
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
    }[]>;
    getUsersCanJoinChannel(senderId: string, channelId: string): Promise<{
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
    }[]>;
    getUserGeust(id: string): Promise<{
        isUser: boolean;
        id: string;
        nickname: string;
        profilePic: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
        lenUser: number;
        idUserOwner: number;
    } | {
        isUser: boolean;
        id: string;
        nickname: string;
        profilePic: string;
        status: string;
        lastSee: number;
        lenUser: number;
        idUserOwner: number;
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
>>>>>>> implement the sockets successfully
    }>;
}
