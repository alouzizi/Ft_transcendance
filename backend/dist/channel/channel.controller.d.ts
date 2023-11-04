import { ChannelService } from './channel.service';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    createChannel(createChannelDto: any, senderId: string): Promise<{
        id: string;
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        channelPassword: string;
        createdAt: Date;
        avatar: string;
        channelOwnerId: string;
    } | {
        status: number;
        error: string;
    }>;
    getChannel(senderId: string, channelId: string): Promise<{
        channleName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        protected: boolean;
        channlePassword: string;
        avatar: string;
        channelOwnerId: string;
    }>;
    getMembersChannel(id: string): Promise<import("./dto/create-channel.dto").memberChannelDto[]>;
    changeStatusAdmin(senderId: string, channelId: string, userId: string): Promise<boolean>;
    kickMember(senderId: string, channelId: string, userId: string): Promise<boolean>;
    banMember(senderId: string, channelId: string, userId: string): Promise<boolean>;
}
