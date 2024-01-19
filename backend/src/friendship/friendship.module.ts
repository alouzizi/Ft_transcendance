import { Module } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, NotificationService],
})
export class FriendshipModule { }
