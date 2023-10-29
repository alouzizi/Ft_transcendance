import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChannelService {
    private prisma;
    constructor(prisma: PrismaService);
    createChannel(createChannelDto: CreateChannelDto, senderId: string): Promise<"This action adds a new channel" | {
        status: number;
        error: string;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChannelDto: UpdateChannelDto): string;
    remove(id: number): string;
}
