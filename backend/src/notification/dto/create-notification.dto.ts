

export class NotificationDTO {
    senderId: string;
    recieverId: string;
    subject: string;

}


// model NotificationTable {
//   id         String           @id @default(uuid())
//   type       NotificationType
//   subjet     String
//   senderId   String
//   recieverId String
//   channelId  String           @default("")

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   user      User?    @relation(fields: [senderId], references: [id])
// }
