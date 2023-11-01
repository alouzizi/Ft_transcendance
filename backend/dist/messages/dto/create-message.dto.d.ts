import { MessageStatus, Status } from "@prisma/client";
export declare class CreateMessageDto {
    content: string;
    senderId: string;
    receivedId: string;
    isDirectMessage: boolean;
}
export declare class messageDto {
    isDirectMsg: Boolean;
    senderId: string;
    senderName: string;
    senderPic: string;
    contentMsg: string;
    createdAt: Date;
    messageStatus: MessageStatus;
    receivedId: string;
    receivedName: string;
    receivedPic: string;
    receivedStatus: Status;
    OwnerChannelId: String;
}
