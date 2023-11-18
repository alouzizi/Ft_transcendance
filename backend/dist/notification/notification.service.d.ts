import { NotificationDTO } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createNotification(createNotificationDto: NotificationDTO): Promise<string>;
    deleteNotification(notificationId: string): Promise<void>;
    fetchNotifications(receiverId: string): Promise<{
        id: string;
        subjet: string;
        senderId: string;
        recieverId: string;
        createdAt: Date;
    }[]>;
}
