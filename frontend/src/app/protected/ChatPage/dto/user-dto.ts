enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

type userDto = {
  id: string;
  email: string;
  nickname: string;
  profilePic: string;
  status: Status;
  lastSee: number;
  friendship: number
};

type ownerDto = {
  id: string;
  intra_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  profilePic: string;
};

type geustDto = {
  isUser: boolean;
  id: string;
  nickname: string;
  profilePic: string;
  status: Status;
  lastSee: number;
  lenUser: number;
};

enum MessageStatus {
  NotReceived = "NotReceived",
  Received = "Received",
  Seen = "Seen"
}

type messageDto = {
  isDirectMsg: Boolean;

  senderId: string; // in channle or direct Msg
  senderName: string; // in channle or direct Msg
  senderPic: string;  // in channle or direct Msg

  contentMsg: string; // lastMsg or simpleMsg
  createdAt: number;
  messageStatus: MessageStatus;

  receivedId: string; // id user in DirectMsg or id channle in ChannelMsg
  receivedName: string; // in channle or direct Msg
  receivedPic: string; // in channle or direct Msg
  receivedStatus: Status; // in DirectMsg

  OwnerChannelId: String;
}

type reqFriendsDto = {
  id: string;
  createdAt: number;
  senderId: string;
  receivedId: string;
}

enum ChannelType {
  Public,
  Private
}

type channelDto = {
  // id: number;
  channleName: string;
  channelType: ChannelType;
  channlePassword: string;
  channelMember: string[];
}

