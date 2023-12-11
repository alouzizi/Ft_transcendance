import { Controller, UseGuards, Param, Body, Delete, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotFoundException } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';


@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post('/createNotification')
  createNotification(@Body() createNotificationDto: any) {
    return this.notificationService.createNotification(createNotificationDto);
  }

  @Delete('/deletenotifications/:notificationId')
  @UseGuards(JwtGuard)
  async deleteNotification(@Param('notificationId') notificationId: string) {
    try {
      await this.notificationService.deleteNotification(notificationId);
      // //console.log(`Notification with ID ${notificationId} has been deleted.`);

      return { statusCode: 200, message: "Notification successfully deleted" };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { statusCode: 404, message: error.message };
      } else {
        // Handle other types of exceptions or log the error
        console.error(error);

        return { statusCode: 500, message: "Internal server error" };
      }
    }
  }


  @Get('/getNotifications/:senderId')
  @UseGuards(JwtGuard)
  async fetchNotifications(@Param('senderId') senderId: string) {
    const notifications = await this.notificationService.fetchNotifications(senderId);
    return notifications;
  }

  @Delete('/clearAll/:senderId')
  @UseGuards(JwtGuard)
  async clearAll(@Param('senderId') senderId: string) {
    const notifications = await this.notificationService.clearAll(senderId);
    return notifications;
  }

}
