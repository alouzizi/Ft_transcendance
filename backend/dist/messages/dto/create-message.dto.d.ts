import { MessageStatus, Status } from "@prisma/client";
export declare class CreateMessageDto {
    content: string;
    senderId: string;
    receivedId: string;
    isDirectMessage: boolean;
    InfoMessage: boolean;
}
export declare class messageDto {
    isDirectMessage: boolean;
    InfoMessage: boolean;
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
    nbrMessageNoRead: number;
    OwnerChannelId: String;
    isChannProtected: boolean;
    inGaming: boolean;
    isBlocked: boolean;
}
