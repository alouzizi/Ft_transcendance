/// <reference types="multer" />
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
    } | {
        error: boolean;
        status?: undefined;
    }>;
    updateChannel(createChannelDto: any, senderId: string, channelId: string): Promise<{
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
    uploadImage(file: Express.Multer.File, senderId: string, channelId: string): Promise<void>;
    checkOwnerIsAdmin(senderId: string, channelId: string): Promise<boolean | {
        error: boolean;
    }>;
    checkUserIsInChannel(senderId: string, channelId: string): Promise<boolean | {
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
    getMembersChannel(id: string): Promise<{
        bannedMembers: import("./dto/create-channel.dto").memberChannelDto[];
        regularMembres: import("./dto/create-channel.dto").memberChannelDto[];
        error?: undefined;
    } | {
        error: boolean;
        bannedMembers?: undefined;
        regularMembres?: undefined;
    }>;
    changeStatusAdmin(senderId: string, channelId: string, userId: string): Promise<boolean | {
        error: boolean;
    }>;
    kickMember(senderId: string, channelId: string, userId: string): Promise<boolean | {
        error: boolean;
    }>;
    banMember(senderId: string, channelId: string, userId: string): Promise<boolean | {
        error: boolean;
    }>;
    leaveChannel(senderId: string, channelId: string): Promise<boolean | {
        error: boolean;
    }>;
    validePassword(senderId: string, channelId: string, password: string): Promise<boolean | {
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
    muteUserChannel(senderId: string, channelId: string, userId: string, timer: string): Promise<{
        error: boolean;
    }>;
    checkIsMuted(senderId: string, channelId: string): Promise<number | {
        error: boolean;
    }>;
    cancelTimeOutByAdmin(senderId: string, channelId: string, userId: string): Promise<{
        error: boolean;
    }>;
}
