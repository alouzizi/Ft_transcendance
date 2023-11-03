type friendDto = {
  id: number;
  email: string;
  username: string;
  avatar: string;
  status: fStatus;
  lastSee: number;
  friendship: number;
  isYouSender: boolean;
};

enum fStatus {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}
