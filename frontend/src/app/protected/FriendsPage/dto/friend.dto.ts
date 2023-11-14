type friendDto = {
  id: string;
  email: string;
  nickname: string;
  profilePic: string;
  status: fStatus;
  lastSee: number;
  friendship: number;
  isYouSender: boolean;
};

enum fStatus {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}
