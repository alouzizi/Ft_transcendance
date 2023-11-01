import { MessageStatus, Status } from "@prisma/client";


export class CreateMessageDto {
  content: string;
  senderId: string;
  receivedId: string;
  isDirectMessage: boolean
}

export class messageDto {
  isDirectMsg: Boolean;

  senderId: string; // in channle or direct Msg
  senderName: string; // in channle or direct Msg
  senderPic: string;  // in channle or direct Msg

  contentMsg: string; // lastMsg or simpleMsg
  createdAt: Date;
  messageStatus: MessageStatus;

  receivedId: string; // id user in DirectMsg or id channle in ChannelMsg
  receivedName: string; // in channle or direct Msg
  receivedPic: string; // in channle or direct Msg
  receivedStatus: Status; // in DirectMsg

}


