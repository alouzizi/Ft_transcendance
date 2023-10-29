export class CreateMessageDto {
  content: string;
  senderId: string;
  receivedId: string;
  idDirectMessage: boolean
}



export enum Status {
  ACTIF,
  INACTIF,
  WRITE,
}