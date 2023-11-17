import { MessagesService } from './messages.service';
export declare class MessageController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getDirectMessage(send: string, rec: string): Promise<import("./dto/create-message.dto").messageDto[] | {
        error: boolean;
    }>;
    getChannelMessage(send: string, channelId: string): Promise<import("./dto/create-message.dto").messageDto[] | {
        error: boolean;
    }>;
    getUserForMsg(senderId: string): Promise<import("./dto/create-message.dto").messageDto[] | {
        error: boolean;
    }>;
}
