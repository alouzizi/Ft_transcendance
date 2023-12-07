import { PrismaService } from "src/prisma/prisma.service";
import { CreateChannelDto, memberChannelDto } from "./dto/create-channel.dto";
import { NotificationService } from "src/notification/notification.service";
export declare class ChannelService {
    private prisma;
    private readonly notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    createMessageInfoChannel(senderId: string, channelId: string, userId: string, msg: string): Promise<void>;
    decryptMessage: (cipherText: string) => any;
    createChannel(createChannelDto: CreateChannelDto, senderId: string): Promise<{
        status: number;
        id: string;
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        protected: boolean;
        channelPassword: string;
        createdAt: Date;
        avatar: string;
        channelOwnerId: string;
        error?: undefined;
    } | {
        status: number;
        error: string;
    } | {
        error: boolean;
        status?: undefined;
    }>;
    updateChannel(senderId: string, channelId: string, updateChannelDto: CreateChannelDto): Promise<{
        status: number;
        error: string;
        channel?: undefined;
    } | {
        status: number;
        channel: {
            channelPassword: string;
            id: string;
            channelName: string;
            channelType: import(".prisma/client").$Enums.ChannelType;
            protected: boolean;
            createdAt: Date;
            avatar: string;
            channelOwnerId: string;
        };
        error?: undefined;
    } | {
        error: boolean;
        status?: undefined;
        channel?: undefined;
    }>;
    uploadImageChannel(senderId: string, channelId: string, path: string): Promise<void>;
    checkOwnerIsAdmin(senderId: string, channelId: string): Promise<boolean | {
        error: boolean;
    }>;
    addUserToChannel(senderId: string, channelId: string, userId: string): Promise<{
        error: boolean;
    }>;
    getChannel(senderId: string, channelId: string): Promise<{
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        channelPassword: string;
        protected: boolean;
        avatar: string;
        channelOwnerId: string;
        error?: undefined;
    } | {
        error: boolean;
        channelName?: undefined;
        channelType?: undefined;
        channelPassword?: undefined;
        protected?: undefined;
        avatar?: undefined;
        channelOwnerId?: undefined;
    }>;
    findChannelById(id: string): Promise<{
        id: string;
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        protected: boolean;
        channelPassword: string;
        createdAt: Date;
        avatar: string;
        channelOwnerId: string;
    } | {
        error: boolean;
    }>;
    getMembersBanned(id: string): Promise<memberChannelDto[]>;
    getRegularMembers(id: string): Promise<memberChannelDto[]>;
    getMembersChannel(id: string): Promise<{
        bannedMembers: memberChannelDto[];
        regularMembres: memberChannelDto[];
        error?: undefined;
    } | {
        error: boolean;
        bannedMembers?: undefined;
        regularMembres?: undefined;
    }>;
    changeStatusAdmin(senderId: string, channelId: string, userId: string): Promise<boolean | {
        error: boolean;
    }>;
    leaveChannel(senderId: string, channelId: string): Promise<boolean | {
        error: boolean;
    }>;
    KickMember(senderId: string, channelId: string, userId: string): Promise<boolean | {
        error: boolean;
    }>;
    checkUserIsInChannel(senderId: string, channelId: string): Promise<boolean | {
        error: boolean;
    }>;
    changeStatutsBanned(senderId: string, channelId: string, userId: string): Promise<boolean | {
        error: boolean;
    }>;
    validePassword(senderId: string, channelId: string, password: string): Promise<boolean | {
        error: boolean;
    }>;
    checkIsBanner(senderId: string, channelId: string): Promise<boolean | {
        error: boolean;
    }>;
    getValideChannels(senderId: string): Promise<{
        id: string;
        channelName: string;
        avatar: string;
        protected: boolean;
        Status: string;
    }[] | {
        error: boolean;
    }>;
    joinChannel(senderId: string, channelId: string): Promise<{
        error: boolean;
    }>;
    muteUserFromChannel(senderId: string, channelId: string, userId: string, timer: string): Promise<{
        error: boolean;
    }>;
    cancelTimeOutByAdmin(senderId: string, channelId: string, userId: string): Promise<{
        error: boolean;
    }>;
    cancelTimeOut(senderId: string, channelId: string): Promise<number>;
    checkIsMuted(senderId: string, channelId: string): Promise<number | {
        error: boolean;
    }>;
}
