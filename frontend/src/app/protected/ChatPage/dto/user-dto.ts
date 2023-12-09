enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

type userDto = {
  id: string;
  nickname: string;
  profilePic: string;
  status: Status;
  lastSee: number;
  friendship: number;
};

type validChannelDto = {
  id: string;
  channelName: string;
  avatar: string;
  protected: boolean;
  Status: string;
};

type ownerDto = {
  id: string;
  intra_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  profilePic: string;
  isTwoFactorAuthEnabled: boolean;
  level: string;


  inGaming: boolean,
  status: Status;
};

type geustDto = {
  isUser: boolean;

  id: string;
  nickname: string;
  profilePic: string;

  status: Status;

  lastSee: number;
  lenUser: number;

  idUserOwner: string;

  inGaming: Boolean;
};

enum MessageStatus {
  NotReceived = "NotReceived",
  Received = "Received",
  Seen = "Seen",
}

type messageDto = {
  elm: any;
  isDirectMessage: Boolean;

  InfoMessage: Boolean;

  senderId: string; // in channle or direct Msg
  senderName: string; // in channle or direct Msg
  senderPic: string; // in channle or direct Msg

  contentMsg: string; // lastMsg or simpleMsg
  createdAt: number;
  messageStatus: MessageStatus;

  receivedId: string; // id user in DirectMsg or id channle in ChannelMsg
  receivedName: string; // in channle or direct Msg
  receivedPic: string; // in channle or direct Msg
  receivedStatus: Status; // in DirectMsg

  nbrMessageNoRead: number;

  OwnerChannelId: String;
  isChannProtected: Boolean;

  inGaming: Boolean;

  isBlocked: Boolean;
};

type reqFriendsDto = {
  id: string;
  createdAt: number;
  senderId: string;
  receivedId: string;
};

enum ChannelType {
  Public = "Public",
  Private = "Private",
}

type channelDto = {
  channelName: string;
  channelType: ChannelType;
  channelPassword: string;
  avatar: string;
  channelOwnerId: string;
  protected: boolean;
  channelMember: string[];
};

type memberChannelDto = {
  userId: string;
  nickname: string;
  profilePic: string;
  role: string;
  status: Status;
  unmuted_at: number;
};
