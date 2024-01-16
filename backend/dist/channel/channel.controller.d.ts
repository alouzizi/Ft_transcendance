/// <reference types="multer" />
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
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
    updateChannel(createChannelDto: any, senderId: string, channelId: string): Promise<{
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
    uploadImage(file: Express.Multer.File, senderId: string, channelId: string): Promise<void>;
    checkOwnerIsAdmin(senderId: string, channelId: string): Promise<boolean>;
    checkUserIsInChannel(senderId: string, channelId: string): Promise<boolean | {
        error: boolean;
    }>;
    addUserToChannel(senderId: string, channelId: string, userId: string): Promise<void>;
    getChannel(senderId: string, channelId: string): Promise<{
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        channelPassword: string;
        protected: boolean;
        avatar: string;
        channelOwnerId: string;
    }>;
    getMembersChannel(senderId: string, id: string): Promise<{
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
    }[] | {
        error: boolean;
    }>;
    joinChannel(senderId: string, channelId: string): Promise<{
        error: boolean;
    }>;
    muteUserChannel(senderId: string, channelId: string, userId: string, timer: string): Promise<void>;
    checkIsMuted(senderId: string, channelId: string): Promise<number>;
    cancelTimeOutByAdmin(senderId: string, channelId: string, userId: string): Promise<{
        error: boolean;
    }>;
}
