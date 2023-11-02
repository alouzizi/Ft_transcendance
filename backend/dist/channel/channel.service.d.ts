import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto, memberChannelDto } from './dto/create-channel.dto';
export declare class ChannelService {
    private prisma;
    constructor(prisma: PrismaService);
    createChannel(createChannelDto: CreateChannelDto, senderId: string): Promise<{
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
    findChannelById(id: string): Promise<{
        id: string;
        channelName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        channelPassword: string;
        createdAt: Date;
        avatar: string;
        channelOwnerId: string;
    }>;
    getMembersChannel(id: string): Promise<memberChannelDto[]>;
}
