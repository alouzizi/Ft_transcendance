import { Status } from "@prisma/client";
export declare class CreateUserDto {
    name: string;
    email: string;
    hash: string;
    avatar: string;
    status: Status;
    lastSee: Date;
}
export declare class MessageItemList {
    isDirectMessage: Boolean;
    name: string;
    avatar: string;
    lastMsg: string;
    createdAt: Date;
    status: Status;
    id: string;
    nameSenderChannel: string;
}
