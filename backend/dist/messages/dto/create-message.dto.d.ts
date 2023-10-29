export declare class CreateMessageDto {
    content: string;
    senderId: string;
    receivedId: string;
    idDirectMessage: boolean;
}
export declare enum Status {
    ACTIF = 0,
    INACTIF = 1,
    WRITE = 2
}
