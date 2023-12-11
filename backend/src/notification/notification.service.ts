import { Injectable } from '@nestjs/common';
import { NotificationDTO } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class NotificationService {

  constructor(private readonly prisma: PrismaService) { }

  async createNotification(createNotificationDto: NotificationDTO) {
    const notification = await this.prisma.notificationTable.create({
      data: {
        senderId: createNotificationDto.senderId,
        recieverId: createNotificationDto.recieverId,
        subjet: createNotificationDto.subject,
      },
    });
    return 'Notification created succesfully';
  }

  async deleteNotification(notificationId: string) {
    const notification = await this.prisma.notificationTable.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      // //console.log("User tried to delete a record that does not exist");
      throw new NotFoundException("There is no notification with the given ID");
    }
    await this.prisma.notificationTable.delete({
      where: { id: notificationId },
    });
    // //console.log(`Notification with ID ${notificationId} has been deleted.`);

    return;
  }

  async clearAll(senderId: string) {
    await this.prisma.notificationTable.deleteMany({
      where: {
        recieverId: senderId
      }
    })
  }


  async fetchNotifications(senderId: string) {
    const notifications = await this.prisma.notificationTable.findMany({
      where: {
        recieverId: senderId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
    return notifications;
  }

}
