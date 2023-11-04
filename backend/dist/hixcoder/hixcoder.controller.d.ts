import { HixcoderService } from "./hixcoder.service";
export declare class HixcoderController {
    private hixcoderService;
    constructor(hixcoderService: HixcoderService);
    getallUsers(sender: string): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    getOneUser(userName: string): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    getOnlineFriends(sender: string): Promise<any[] | {
        error: any;
    }>;
    getAllFriends(sender: string): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getPendingFriends(sender: string): Promise<{
        isYouSender: boolean;
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getBlockedFriends(sender: string): Promise<any[] | {
        error: any;
    }>;
    getAllPossibleFriends(sender: string): Promise<{
        id: number;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    sendFriendRequest(sender: string, reciever: string): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    acceptFriendRequest(sender: string, reciever: string): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    unsendFriendRequest(sender: string, reciever: string): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    rejectFriendRequest(sender: string, reciever: string): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    blockFriend(sender: string, reciever: string): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    unblockFriend(sender: string, reciever: string): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    } | {
        error: any;
    }>;
    removeFriend(sender: string, reciever: string): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    } | {
        id: number;
        senderId: number;
        receivedId: number;
    }[] | {
        error: any;
    }>;
}
