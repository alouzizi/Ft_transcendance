<<<<<<< HEAD
import { FriendshipService } from "./friendship.service";
=======
import { FriendshipService } from './friendship.service';
>>>>>>> implement the sockets successfully
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    getSendRequistFriends(sender: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }[]>;
    getRecivedRequistFriends(sender: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }[]>;
    getFriends(sender: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[]>;
    getBlockedUser(sender: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[]>;
    addFriendRequest(sender: string, recived: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    }>;
    removeFriendRequest(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    accepteFriendRequest(sender: string, recived: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }>;
    deleteFriend(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    blockedUser(sender: string, recived: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }>;
    unBlockedUser(sender: string, recived: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
