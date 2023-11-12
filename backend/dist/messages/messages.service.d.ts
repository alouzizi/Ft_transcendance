<<<<<<< HEAD
import { CreateMessageDto } from "./dto/create-message.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Server } from "socket.io";
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    getMessage(senderId: string, receivedId: string): Promise<{
        id: string;
        content: string;
        createdAt: Date;
        showed: boolean;
        senderId: string;
        receivedId: string;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
    }[]>;
    getLastMessages(senderId: string, receivedId: string): Promise<{
        id: string;
        content: string;
        createdAt: Date;
        showed: boolean;
        senderId: string;
        receivedId: string;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
    } | {
        content: string;
        createdAt: number;
    }>;
=======
import { CreateMessageDto, messageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server } from 'socket.io';
import { UserService } from 'src/user/user.service';
export declare class MessagesService {
    private prisma;
    private userService;
    constructor(prisma: PrismaService, userService: UserService);
    createDirectMessage(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    createChannelMessage(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    createMessage(server: Server, createMessageDto: CreateMessageDto): Promise<void>;
    getDirectMessage(senderId: string, receivedId: string): Promise<messageDto[]>;
    getChannelMessage(senderId: string, channelId: string): Promise<messageDto[]>;
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
        InfoMessage: boolean;
    }>;
    getChannleForMsg(senderId: string): Promise<messageDto[]>;
    getMessageForList(senderId: string): Promise<messageDto[]>;
>>>>>>> implement the sockets successfully
}
