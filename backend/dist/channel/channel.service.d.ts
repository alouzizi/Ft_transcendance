import { NotificationService } from 'src/notification/notification.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto, memberChannelDto } from './dto/create-channel.dto';
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
    } | {
        channelPassword: string;
        id: string;
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        protected: boolean;
        createdAt: Date;
        avatar: string;
        channelOwnerId: string;
        status?: undefined;
        error?: undefined;
    }>;
    uploadImageChannel(senderId: string, channelId: string, path: string): Promise<void>;
    checkOwnerIsAdmin(senderId: string, channelId: string): Promise<boolean>;
    addUserToChannel(senderId: string, channelId: string, userId: string): Promise<void>;
    getChannel(senderId: string, channelId: string): Promise<{
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        channelPassword: string;
        protected: boolean;
        avatar: string;
        channelOwnerId: string;
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
    getMembersChannel(senderId: string, channelId: string): Promise<{
        bannedMembers: memberChannelDto[];
        regularMembres: memberChannelDto[];
    }>;
    changeStatusAdmin(senderId: string, channelId: string, userId: string): Promise<boolean>;
    leaveChannel(senderId: string, channelId: string): Promise<boolean>;
    KickMember(senderId: string, channelId: string, userId: string): Promise<boolean>;
    checkUserIsInChannel(senderId: string, channelId: string): Promise<boolean | {
        error: boolean;
    }>;
    changeStatutsBanned(senderId: string, channelId: string, userId: string): Promise<boolean>;
    validePassword(senderId: string, channelId: string, password: string): Promise<boolean>;
    checkIsBanner(senderId: string, channelId: string): Promise<boolean>;
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
    muteUserFromChannel(senderId: string, channelId: string, userId: string, timer: string): Promise<void>;
    cancelTimeOutByAdmin(senderId: string, channelId: string, userId: string): Promise<{
        error: boolean;
    }>;
    cancelTimeOut(senderId: string, channelId: string): Promise<number>;
    checkIsMuted(senderId: string, channelId: string): Promise<number>;
}
