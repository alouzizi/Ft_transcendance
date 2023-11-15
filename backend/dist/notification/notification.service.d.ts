import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createNotificationDto: CreateNotificationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateNotificationDto: UpdateNotificationDto): string;
    remove(id: number): string;
    createNotification(notificationDto: CreateNotificationDto): import(".prisma/client").Prisma.Prisma__NotificationClient<{
        id: string;
        createdAt: Date;
        senderId: string;
        receivedId: string;
        content: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
