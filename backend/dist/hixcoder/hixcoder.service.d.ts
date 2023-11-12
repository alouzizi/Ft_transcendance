import { PrismaService } from "src/prisma/prisma.service";
export declare class HixcoderService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(senderId: string): Promise<{
        id: string;
<<<<<<< HEAD
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
>>>>>>> implement the sockets successfully
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    getOneUser(recieverId: string): Promise<{
        id: string;
<<<<<<< HEAD
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
>>>>>>> implement the sockets successfully
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }>;
    getOnlineFriends(senderId: string): Promise<any[] | {
        error: any;
    }>;
    getAllFriends(senderId: string): Promise<{
        id: string;
<<<<<<< HEAD
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
>>>>>>> implement the sockets successfully
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getPendingFriends(senderId: string): Promise<{
        isYouSender: boolean;
        id: string;
<<<<<<< HEAD
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
>>>>>>> implement the sockets successfully
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[]>;
    getBlockedFriends(senderId: string): Promise<any[] | {
        error: any;
    }>;
    getAllPossibleFriends(senderId: string): Promise<{
        id: string;
<<<<<<< HEAD
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
>>>>>>> implement the sockets successfully
        status: import(".prisma/client").$Enums.Status;
        lastSee: Date;
    }[] | {
        error: any;
    }>;
    sendFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    acceptFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    unsendFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    rejectFriendRequest(senderId: string, recieverId: string): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    blockFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    unblockFriend(senderId: string, recieverId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    } | {
        error: any;
    }>;
    removeFriend(senderId: string, recieverId: string): Promise<{
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
<<<<<<< HEAD
    test_giveFriendsToUser(userId: string): Promise<{
        id: string;
        senderId: string;
        receivedId: string;
    }[]>;
    test_createManyUsers(): Promise<void>;
=======
>>>>>>> implement the sockets successfully
}
