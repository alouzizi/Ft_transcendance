import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationService } from './notification.service';


@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationService) { }


  @Post()
  async createNotification(@Body() notificationDto: CreateNotificationDto) {
    return this.notificationService.createNotification(notificationDto);
  }
}
