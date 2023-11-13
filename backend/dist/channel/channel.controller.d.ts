import { ChannelService } from './channel.service';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    createChannel(createChannelDto: any, senderId: string): Promise<{
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
    }>;
    updateChannel(createChannelDto: any, senderId: string, channelId: string): Promise<{
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
        status: number;
        error: string;
        channel?: undefined;
    }>;
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
    getMembersChannel(id: string): Promise<{
        bannedMembers: import("./dto/create-channel.dto").memberChannelDto[];
        regularMembres: import("./dto/create-channel.dto").memberChannelDto[];
    }>;
    changeStatusAdmin(senderId: string, channelId: string, userId: string): Promise<boolean>;
    kickMember(senderId: string, channelId: string, userId: string): Promise<boolean>;
    banMember(senderId: string, channelId: string, userId: string): Promise<boolean>;
    leaveChannel(senderId: string, channelId: string): Promise<boolean>;
    validePassword(senderId: string, channelId: string, password: string): Promise<boolean>;
    getValideChannels(senderId: string): Promise<{
        id: string;
        channelName: string;
        avatar: string;
        protected: boolean;
        Status: string;
    }[]>;
    joinChannel(senderId: string, channelId: string): Promise<void>;
    muteUserChannel(senderId: string, channelId: string, userId: string, timer: string): Promise<void>;
    checkIsMuted(senderId: string, channelId: string): Promise<number>;
    cancelTimeOutByAdmin(senderId: string, channelId: string, userId: string): Promise<void>;
}
