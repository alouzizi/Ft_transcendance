import { NotificationDTO } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createNotification(createNotificationDto: NotificationDTO): Promise<string>;
    deleteNotification(notificationId: string): Promise<void>;
    clearAll(senderId: string): Promise<void>;
    fetchNotifications(senderId: string): Promise<({
        user: {
            id: string;
            intra_id: string;
            first_name: string;
            last_name: string;
            nickname: string;
            email: string;
            profilePic: string;
            inGaming: boolean;
            isTwoFactorAuthEnabled: boolean;
            twoFactorAuthSecret: string;
            level: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.Status;
            lastSee: Date;
        };
    } & {
        id: string;
        subjet: string;
        senderId: string;
        recieverId: string;
        createdAt: Date;
    })[]>;
}
