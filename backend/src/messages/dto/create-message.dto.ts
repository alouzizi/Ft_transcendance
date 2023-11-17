<<<<<<< HEAD
import { MessageStatus, Status } from "@prisma/client";
=======
import { ChannelType, MessageStatus, Status } from "@prisma/client";
>>>>>>> origin/lhoussin


export class CreateMessageDto {
  content: string;
<<<<<<< HEAD
  senderId: string;
  receivedId: string;
  isDirectMessage: boolean
}

export class messageDto {
  isDirectMsg: Boolean;
=======

  senderId: string;
  receivedId: string;

  isDirectMessage: boolean;

  InfoMessage: boolean;
}




export class messageDto {
  isDirectMessage: boolean;

  InfoMessage: boolean;
>>>>>>> origin/lhoussin

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

<<<<<<< HEAD
=======

  OwnerChannelId: String;
  isChannProtected: boolean
  // status: Status;

>>>>>>> origin/lhoussin
}


