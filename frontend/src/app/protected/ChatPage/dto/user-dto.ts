
type userDto = {
  id: string;
  email: string;
  nickname: string;
  profilePic: string;
  status: Status;
  lastSee: number;
  friendship: number
};



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



enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

enum MessageStatus {
  NotReceived = "NotReceived",
  Received = "Received",
  Seen = "Seen"
}

// type channelDto = {
//   id: number;
//   channleName: string;
//   channelType: string;
//   channlePassword: string;
// }

