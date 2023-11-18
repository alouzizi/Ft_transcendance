import { Controller, Request, Response, Param, Body, Delete, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotFoundException } from '@nestjs/common';


@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}





  @Post('/createNotification')
  createNotification(@Body() createNotificationDto: any) {
    console.log(typeof createNotificationDto.senderId, createNotificationDto.recieverId);
  
    return this.notificationService.createNotification(createNotificationDto);
  }
@Delete('/deletenotifications/:notificationId')
async deleteNotification(@Param('notificationId') notificationId: string) {
  try {
    console.log(notificationId);
    await this.notificationService.deleteNotification(notificationId);
    // console.log(`Notification with ID ${notificationId} has been deleted.`);

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

  
  @Get('/getNotifications/:recieverId')
  async fetchNotifications(@Param('recieverId') recieverId: string){
    const notifications = await this.notificationService.fetchNotifications(recieverId);
    return notifications;
  }
  
}
