enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

type userDto = {
  id: string;
<<<<<<< HEAD
  email: string;
=======
>>>>>>> origin/lhoussin
  nickname: string;
  profilePic: string;
  status: Status;
  lastSee: number;
<<<<<<< HEAD
  friendship: number
=======
  friendship: number;
};


type validChannelDto = {
  id: string;
  channelName: string;
  avatar: string;
  protected: boolean;
  Status: string;
>>>>>>> origin/lhoussin
};

type ownerDto = {
  id: string;
  intra_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  profilePic: string;
<<<<<<< HEAD
=======
  isTwoFactorAuthEnabled: boolean
>>>>>>> origin/lhoussin
};

type geustDto = {
  isUser: boolean;
<<<<<<< HEAD
  id: string;
  nickname: string;
  profilePic: string;
  status: Status;
  lastSee: number;
  lenUser: number;
=======

  id: string;
  nickname: string;
  profilePic: string;

  status: Status;

  lastSee: number;
  lenUser: number;

  idUserOwner: string;
>>>>>>> origin/lhoussin
};

enum MessageStatus {
  NotReceived = "NotReceived",
  Received = "Received",
  Seen = "Seen"
}

type messageDto = {
<<<<<<< HEAD
  isDirectMsg: Boolean;
=======
  elm: any;
  isDirectMessage: Boolean;

  InfoMessage: Boolean;
>>>>>>> origin/lhoussin

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
<<<<<<< HEAD
=======
  isChannProtected: Boolean


>>>>>>> origin/lhoussin
}

type reqFriendsDto = {
  id: string;
  createdAt: number;
  senderId: string;
  receivedId: string;
}

enum ChannelType {
<<<<<<< HEAD
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

=======
  Public = 'Public',
  Private = 'Private'
}


type channelDto = {
  channelName: string;
  channelType: ChannelType;
  channelPassword: string;
  avatar: string;
  channelOwnerId: string;
  protected: boolean;
  channelMember: string[];
  inviteLink: string;
}

type memberChannelDto = {
  userId: string;
  nickname: string;
  profilePic: string;
  role: string;
  status: Status;
  unmuted_at: number;
}
>>>>>>> origin/lhoussin
