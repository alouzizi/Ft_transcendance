import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createNotification(createNotificationDto: any): Promise<string>;
    deleteNotification(notificationId: string): Promise<{
        statusCode: number;
        message: string;
    }>;
    fetchNotifications(recieverId: string): Promise<{
        id: string;
        subjet: string;
        senderId: string;
        recieverId: string;
        createdAt: Date;
    }[]>;
}
