import { CreateMessageDto, SendMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    createDirectMessage(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    createChannelMessage(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    createMessage(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    getDirectMessage(senderId: string, receivedId: string): Promise<SendMessageDto[]>;
    getChannelMessage(senderId: string, channelId: string): Promise<SendMessageDto[]>;
    getLastMessages(senderId: string, receivedId: string): Promise<{
        id: string;
        isDirectMessage: boolean;
        senderId: string;
        content: string;
        createdAt: Date;
        showed: boolean;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
        receivedId: string;
        channelId: string;
    }>;
}
