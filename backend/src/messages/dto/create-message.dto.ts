export class CreateMessageDto {
  content: string;
  senderId: number;
  receivedId: number;
}



export enum Status {
  ACTIF,
  INACTIF,
  WRITE,
}