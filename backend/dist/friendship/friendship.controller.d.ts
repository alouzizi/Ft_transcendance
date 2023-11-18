import { FriendshipService } from './friendship.service';
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    getSendRequistFriends(sender: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }[] | {
        error: boolean;
    }>;
    getRecivedRequistFriends(sender: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }[] | {
        error: boolean;
    }>;
    getFriends(sender: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[] | {
        error: boolean;
    }>;
    getBlockedUser(sender: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[] | {
        error: boolean;
    }>;
    addFriendRequest(sender: string, recived: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: boolean;
    }>;
    removeFriendRequest(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        error: boolean;
    }>;
    accepteFriendRequest(sender: string, recived: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: boolean;
    }>;
    deleteFriend(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        error: boolean;
    }>;
    blockedUser(sender: string, recived: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: boolean;
    }>;
    unBlockedUser(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload | {
        error: boolean;
    }>;
}
