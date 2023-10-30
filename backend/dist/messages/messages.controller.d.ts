import { MessagesService } from './messages.service';
export declare class MessageController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getDirectMessage(send: string, rec: string): Promise<import("./dto/create-message.dto").SendMessageDto[]>;
    getChannelMessage(send: string, channelId: string): Promise<import("./dto/create-message.dto").SendMessageDto[]>;
}
