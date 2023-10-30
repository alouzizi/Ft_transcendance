import { MessageStatus } from "@prisma/client";
export declare class CreateMessageDto {
    content: string;
    senderId: string;
    receivedId: string;
    isDirectMessage: boolean;
}
export declare class SendMessageDto {
    id: string;
    content: string;
    createdAt: Date;
    senderId: string;
    receivedId: string;
    messageStatus: MessageStatus;
    avata: string;
    nickName: string;
}
export declare enum Status {
    ACTIF = 0,
    INACTIF = 1,
    WRITE = 2
}
