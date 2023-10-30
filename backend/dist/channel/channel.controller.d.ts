import { ChannelService } from './channel.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    createChannel(createChannelDto: any, senderId: string): Promise<"This action adds a new channel" | {
        status: number;
        error: string;
    }>;
    findAll(): string;
    findOne(id: string): Promise<{
        id: string;
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        channelPassword: string;
        createdAt: Date;
        avatar: string;
        channelOwnerId: string;
    }>;
    update(id: string, updateChannelDto: UpdateChannelDto): string;
    remove(id: string): string;
}
