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



enum MessageStatus {
  NotReceived = "NotReceived",
  Received = "Received",
  Seen = "Seen"
}
type msgDto = {
  id: string;
  content: string;
  createdAt: number;
  senderId: string;
  receivedId: string;
  messageStatus: MessageStatus;
};

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

