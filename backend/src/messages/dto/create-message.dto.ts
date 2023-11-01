import { MessageStatus } from "@prisma/client";

export class CreateMessageDto {
  content: string;
  senderId: string;
  receivedId: string;
  isDirectMessage: boolean
}


export class SendMessageDto {
  isDirectMsg: Boolean;
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
  receivedId: string;
  messageStatus: MessageStatus;

  avata: string;
  nickName: string;
  nameChannel: string;
}



export enum Status {
  ACTIF,
  INACTIF,
  WRITE,
}