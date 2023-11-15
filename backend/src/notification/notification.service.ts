import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService} from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
 
  constructor(
    private prisma: PrismaService,
  ) { }

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  createNotification(notificationDto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        ...notificationDto,
      }
    })
  }

}

