import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
export declare class ChannelService {
    private prisma;
    constructor(prisma: PrismaService);
    createChannel(createChannelDto: CreateChannelDto, senderId: string): Promise<"This action adds a new channel" | {
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
    findAll(): string;
    update(id: number, updateChannelDto: UpdateChannelDto): string;
    remove(id: number): string;
}
