import { MessagesService } from './messages.service';
export declare class MessageController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getMessages(send: string, rec: string): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        showed: boolean;
        senderId: number;
        receivedId: number;
        messageStatus: import(".prisma/client").$Enums.MessageStatus;
    }[] | "">;
}