import { MessagesService } from './messages.service';
export declare class MessageController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getMessages(send: string, rec: string): Promise<{
        id: string;
        isDirectMessage: boolean;
        senderId: string;
        content: string;
        createdAt: Date;
        showed: boolean;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
        receivedId: string;
        channelId: string;
    }[]>;
}
