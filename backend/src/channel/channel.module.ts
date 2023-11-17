import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
<<<<<<< HEAD
import { UserModule } from 'src/users/user.module';

@Module({
  imports:[UserModule],
=======

@Module({
>>>>>>> origin/lhoussin
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService]
})
export class ChannelModule { }
