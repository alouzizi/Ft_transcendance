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

type msgDto = {
  isDirectMsg: Boolean;
  id: string;
  content: string;
  createdAt: number;
  senderId: string;
  receivedId: string;
  messageStatus: MessageStatus;

  avata: string;
  nickName: string; // user
  nameChannel: string;
};

type MessageItemList = {
  isDirectMsg: Boolean;

  name: string;
  avatar: string;
  lastMsg: string;
  createdAt: number;

  status: Status;

  id: string; // id user geust or id channel
  nameSenderChannel: string;
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

