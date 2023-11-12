<<<<<<< HEAD
import { MessagesService } from "./messages.service";
export declare class MessageController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getMessages(send: string, rec: string): Promise<{
        id: string;
        content: string;
        createdAt: Date;
        showed: boolean;
        senderId: string;
        receivedId: string;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
    }[]>;
=======
import { MessagesService } from './messages.service';
export declare class MessageController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getDirectMessage(send: string, rec: string): Promise<import("./dto/create-message.dto").messageDto[]>;
    getChannelMessage(send: string, channelId: string): Promise<import("./dto/create-message.dto").messageDto[]>;
    getUserForMsg(senderId: string): Promise<import("./dto/create-message.dto").messageDto[]>;
>>>>>>> implement the sockets successfully
}
