import { HixcoderService } from "./hixcoder.service";
export declare class HixcoderController {
    private hixcoderService;
    constructor(hixcoderService: HixcoderService);
    getallUsers(sender: string): Promise<{
        id: string;
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
        id: string;
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
        id: string;
        email: string;
        username: string;
        hash: string;
        avatar: string;
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getPendingFriends(sender: string): Promise<{
        isYouSender: boolean;
        id: string;
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
        id: string;
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
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    acceptFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    unsendFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    rejectFriendRequest(sender: string, reciever: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    blockFriend(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    unblockFriend(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    removeFriend(sender: string, reciever: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        id: string;
        senderId: string;
        receivedId: string;
    }[] | {
        error: any;
    }>;
}
