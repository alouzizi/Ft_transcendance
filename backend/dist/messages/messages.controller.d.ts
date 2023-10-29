import { MessagesService } from './messages.service';
export declare class MessageController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getMessages(send: string, rec: string): Promise<{
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
}
