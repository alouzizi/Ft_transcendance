import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';
export declare class NotificationsController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createNotification(notificationDto: CreateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
        content: string;
    }>;
}
