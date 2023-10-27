import { FriendshipService } from './friendship.service';
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    getSendRequistFriends(sender: string): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    }[]>;
    getRecivedRequistFriends(sender: string): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    }[]>;
    getFriends(sender: string): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }[]>;
    getBlockedUser(sender: string): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }[]>;
    addFriendRequest(sender: string, recived: string): Promise<{
        id: number;
        createdAt: Date;
        senderId: number;
        receivedId: number;
    }>;
    removeFriendRequest(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    accepteFriendRequest(sender: string, recived: string): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }>;
    deleteFriend(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    blockedUser(sender: string, recived: string): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }>;
    unBlockedUser(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
