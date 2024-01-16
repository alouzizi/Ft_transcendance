import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, NotificationService],
  exports: [ChannelService]
})
export class ChannelModule { }
