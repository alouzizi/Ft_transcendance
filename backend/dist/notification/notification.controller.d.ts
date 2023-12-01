import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createNotification(createNotificationDto: any): Promise<string>;
    deleteNotification(notificationId: string): Promise<{
        statusCode: number;
        message: string;
    }>;
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
    clearAll(senderId: string): Promise<void>;
}
