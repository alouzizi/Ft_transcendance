import { PrismaService } from "src/prisma/prisma.service";
import { MessagesService } from "src/messages/messages.service";
export declare class UserService {
    private prisma;
    private messagesService;
    constructor(prisma: PrismaService, messagesService: MessagesService);
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    findById(id: number): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    findAllUsers(): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getValideUsers(senderId: number): Promise<{
        friendship: number;
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getUserForMsg(senderId: number): Promise<{
        usersMsgList: {
            id: number;
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
