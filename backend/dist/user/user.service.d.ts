import { PrismaService } from "src/prisma/prisma.service";
import { MessagesService } from "src/messages/messages.service";
export declare class UserService {
    private prisma;
    private messagesService;
    constructor(prisma: PrismaService, messagesService: MessagesService);
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    findAllUsers(): Promise<{
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
