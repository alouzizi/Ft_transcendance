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
            id: string;
            channelName: string;
            channelType: import(".prisma/client").$Enums.ChannelType;
            protected: boolean;
            channelPassword: string;
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
    addUserToChannel(senderId: string, channelId: string, userId: string): Promise<void>;
    getChannel(senderId: string, channelId: string): Promise<{
        channleName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        channlePassword: string;
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
}
