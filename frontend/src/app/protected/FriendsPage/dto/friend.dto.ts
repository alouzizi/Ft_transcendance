type friendDto = {
  id: string;
  email: string;
<<<<<<< HEAD
  username: string;
  avatar: string;
=======
  nickname: string;
  profilePic: string;
>>>>>>> implement the sockets successfully
  status: fStatus;
  lastSee: number;
  friendship: number;
  isYouSender: boolean;
};

enum fStatus {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}
