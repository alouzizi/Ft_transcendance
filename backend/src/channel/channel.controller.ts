import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelType } from '@prisma/client';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Post('/createChannel/:senderId')
  createChannel(@Body() createChannelDto: any,
    @Param('senderId') senderId: string) {
    console.log(typeof createChannelDto.channelType, createChannelDto.channelType);
    const channelData: CreateChannelDto = {
      ...createChannelDto,
      channelType: (createChannelDto.channelType == 'Private') ? ChannelType.Private : ChannelType.Public,
    }
    return this.channelService.createChannel(channelData, senderId);
  }

  @Post('/updateChannel/:senderId/:channelId')
  updateChannel(@Body() createChannelDto: any,
    @Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    const channelData: CreateChannelDto = {
      ...createChannelDto,
      channelType: (createChannelDto.channelType == 'Private') ? ChannelType.Private : ChannelType.Public,
    }
    return this.channelService.updateChannel(senderId, channelId, channelData);
  }


  @Get('/checkOwnerIsAdmin/:senderId/:channelId')
  checkOwnerIsAdmin(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.checkOwnerIsAdmin(senderId, channelId);
  }

  @Get('/addUserToChannel/:senderId/:channelId/:userId')
  addUserToChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.addUserToChannel(senderId, channelId, userId);
  }

  @Get('/getChannel/:senderId/:channelId')
  getChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.getChannel(senderId, channelId);
  }

  @Get('/getMembersChannel/:id')
  getMembersChannel(@Param('id') id: string) {
    return this.channelService.getMembersChannel(id);
  }


  @Get('/changeStatusAdmin/:senderId/:channelId/:userId')
  changeStatusAdmin(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.changeStatusAdmin(senderId, channelId, userId);
  }

  @Get('/kickmember/:senderId/:channelId/:userId')
  kickMember(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.KickMember(senderId, channelId, userId);
  }

  @Get('/bannedmember/:senderId/:channelId/:userId')
  banMember(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.changeStatutsBanned(senderId, channelId, userId);
  }


  @Get('/leaveChannel/:senderId/:channelId')
  leaveChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.leaveChannel(senderId, channelId);
  }


  @Get('/validePassword/:senderId/:channelId/:password')
  validePassword(@Param('senderId') senderId: string, @Param('channelId') channelId: string
    , @Param('password') password: string) {
    return this.channelService.validePassword(senderId, channelId, password);
  }


  @Get('/getValideChannels/:senderId')
  getValideChannels(@Param('senderId') senderId: string) {
    return this.channelService.getValideChannels(senderId);
  }

  @Get('/joinChannel/:senderId/:channelId/')
  joinChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.joinChannel(senderId, channelId);
  }
}
