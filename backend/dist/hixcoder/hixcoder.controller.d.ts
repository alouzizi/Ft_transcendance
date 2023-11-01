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
    getOnlineFriends(sender: string): Promise<any[] | {
        error: any;
    }>;
    getAllFriends(sender: string): Promise<any[] | {
        error: any;
    }>;
    getPendingFriends(sender: string): Promise<any[] | {
        error: any;
    }>;
    getBlockedFriends(sender: string): Promise<any[] | {
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
        error: any;
    }>;
}
