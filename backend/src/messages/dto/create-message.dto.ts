import { MessageStatus } from "@prisma/client";

export class CreateMessageDto {
  content: string;
  senderId: string;
  receivedId: string;
  isDirectMessage: boolean
}


export class SendMessageDto {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
  receivedId: string;
  messageStatus: MessageStatus;

  avata: string;
  nickName: string;
}



export enum Status {
  ACTIF,
  INACTIF,
  WRITE,
}