import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationsController } from './notification.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationService, PrismaService],
})
export class NotificationModule {}
