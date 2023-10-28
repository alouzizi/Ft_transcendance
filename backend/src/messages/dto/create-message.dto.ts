export class CreateMessageDto {
  content: string;
  senderId: string;
  receivedId: string;
}



export enum Status {
  ACTIF,
  INACTIF,
  WRITE,
}