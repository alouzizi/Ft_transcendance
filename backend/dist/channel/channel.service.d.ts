import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto, memberChannelDto } from './dto/create-channel.dto';
export declare class ChannelService {
    private prisma;
    constructor(prisma: PrismaService);
    createMessageInfoChannel(senderId: string, channelId: string, userId: string, msg: string): Promise<void>;
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
    addUserToChannel(senderId: string, channelId: string, userId: string): Promise<void>;
    getChannel(senderId: string, channelId: string): Promise<{
        channleName: string;
        channelType: import(".prisma/client").$Enums.ChannelType;
        protected: boolean;
        channlePassword: string;
        avatar: string;
        channelOwnerId: string;
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
    getMembersBanned(id: string): Promise<memberChannelDto[]>;
    getRegularMembers(id: string): Promise<memberChannelDto[]>;
    getMembersChannel(id: string): Promise<{
        bannedMembers: memberChannelDto[];
        regularMembres: memberChannelDto[];
    }>;
    changeStatusAdmin(senderId: string, channelId: string, userId: string): Promise<boolean>;
    leaveChannel(senderId: string, channelId: string): Promise<boolean>;
    KickMember(senderId: string, channelId: string, userId: string): Promise<boolean>;
    changeStatutsBanned(senderId: string, channelId: string, userId: string): Promise<boolean>;
}
