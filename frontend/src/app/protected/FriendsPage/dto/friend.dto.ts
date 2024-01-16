type friendDto = {
  id: string;
  email: string;
  nickname: string;
  profilePic: string;
  status: fStatus;
  lastSee: number;
  friendship: number;
  inGaming: boolean;
  isYouSender: boolean;
};

enum fStatus {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}