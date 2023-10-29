import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    getMessage(senderId: string, receivedId: string): Promise<{
        isDirectMessage: boolean;
        id: string;
        content: string;
        createdAt: Date;
        showed: boolean;
        senderId: string;
        receivedId: string;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
        channelId: string;
    }[]>;
    getLastMessages(senderId: string, receivedId: string): Promise<{
        isDirectMessage: boolean;
        id: string;
        content: string;
        createdAt: Date;
        showed: boolean;
        senderId: string;
        receivedId: string;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
        channelId: string;
    }>;
}
