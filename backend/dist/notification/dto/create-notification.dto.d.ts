import { NotificationType } from "@prisma/client";
export declare class NotificationDTO {
    type: NotificationType;
    senderId: string;
    recieverId: string;
    subject: string;
    channelId: string;
}
