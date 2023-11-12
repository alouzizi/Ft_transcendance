<<<<<<< HEAD
=======
import { MessageStatus, Status } from "@prisma/client";
>>>>>>> implement the sockets successfully
export declare class CreateMessageDto {
    content: string;
    senderId: string;
    receivedId: string;
<<<<<<< HEAD
}
export declare enum Status {
    ACTIF = 0,
    INACTIF = 1,
    WRITE = 2
=======
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
    OwnerChannelId: String;
>>>>>>> implement the sockets successfully
}
