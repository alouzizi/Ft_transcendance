import { CreateMessageDto, messageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    createMessage(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    createDirectMessage(server: Server, createMessageDto: CreateMessageDto): Promise<{
        error: boolean;
    }>;
    createChannelMessage(server: Server, createMessageDto: CreateMessageDto): Promise<{
        error: boolean;
    }>;
    getDirectMessage(senderId: string, receivedId: string): Promise<messageDto[] | {
        error: boolean;
    }>;
    getChannelMessage(senderId: string, channelId: string): Promise<messageDto[] | {
        error: boolean;
    }>;
    getLastMessages(senderId: string, receivedId: string): Promise<{
        id: string;
        isDirectMessage: boolean;
        senderId: string;
        content: string;
        createdAt: Date;
        notSendTo: string;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
        receivedId: string;
        channelId: string;
        InfoMessage: boolean;
    }>;
    getChannleForMsg(senderId: string): Promise<messageDto[]>;
    getMessageForList(senderId: string): Promise<messageDto[] | {
        error: boolean;
    }>;
}
