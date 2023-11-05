import { UserService } from "./user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUserProfile(id: string): Promise<{
        id: string;
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
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getValideUsers(senderId: string): Promise<{
        friendship: number;
        id: string;
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
    }>;
}
