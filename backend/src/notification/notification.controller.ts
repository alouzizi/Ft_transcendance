import {
  Controller,
  UseGuards,
  Param,
  Body,
  Delete,
  Get,
  Post,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotFoundException } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('notification')
@UseGuards(JwtGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/createNotification')
  createNotification(@Body() createNotificationDto: any) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Delete('/deletenotifications/:notificationId')
  async deleteNotification(@Param('notificationId') notificationId: string) {
    try {
      await this.notificationService.deleteNotification(notificationId);
      return { statusCode: 200, message: 'Notification successfully deleted' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { statusCode: 404, message: error.message };
      } else {
        return { statusCode: 500, message: 'Internal server error' };
      }
    }
  }

  @Get('/getNotifications/:senderId')
  async fetchNotifications(@Param('senderId') senderId: string) {
    const notifications =
      await this.notificationService.fetchNotifications(senderId);
    return notifications;
  }

  @Delete('/clearAll/:senderId')
  async clearAll(@Param('senderId') senderId: string) {
    const notifications = await this.notificationService.clearAll(senderId);
    return notifications;
  }
}
