import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { ChannelType } from '@prisma/client';
import { diskStorage } from "multer";
import { JwtGuard } from 'src/auth/guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@Controller('channel')
@UseGuards(JwtGuard)
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Post('/createChannel/:senderId')
  createChannel(@Body() createChannelDto: CreateChannelDto,
    @Param('senderId') senderId: string) {
    return this.channelService.createChannel(createChannelDto, senderId);
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


  @Post("/uploadImage/:senderId/:channelId")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = file.originalname.split(".")[0];
        const fileExtension = file.originalname.split(".")[1];
        const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
        cb(null, newFileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
        return cb(null, false);
      cb(null, true);
    }
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File,
    @Param("senderId") senderId: string,
    @Param("channelId") channelId: string,
  ) {
    return this.channelService.uploadImageChannel(senderId, channelId, file.path);
  }



  @Get('/checkOwnerIsAdmin/:senderId/:channelId')
  checkOwnerIsAdmin(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.checkOwnerIsAdmin(senderId, channelId);
  }

  @Get('/checkUserIsInChannel/:senderId/:channelId')
  checkUserIsInChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.checkUserIsInChannel(senderId, channelId);
  }

  @Get('/addUserToChannel/:senderId/:channelId/:userId')
  addUserToChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.addUserToChannel(senderId, channelId, userId);
  }

  @Get('/getChannel/:senderId/:channelId')
  getChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.getChannel(senderId, channelId);
  }

  @Get('/getMembersChannel/:senderId/:id')
  getMembersChannel(@Param('senderId') senderId: string, @Param('id') id: string) {
    return this.channelService.getMembersChannel(senderId, id);
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


  @Get('/getValideChannels/:senderId') // null
  getValideChannels(@Param('senderId') senderId: string) {
    return this.channelService.getValideChannels(senderId);
  }

  @Get('/joinChannel/:senderId/:channelId/')
  joinChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.joinChannel(senderId, channelId);
  }

  @Get('/muteUserChannel/:senderId/:channelId/:userId/:timer')
  muteUserChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string,
    @Param('userId') userId: string, @Param('timer') timer: string) {
    return this.channelService.muteUserFromChannel(senderId, channelId, userId, timer);
  }


  @Get('/checkIsMuted/:senderId/:channelId')
  checkIsMuted(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.checkIsMuted(senderId, channelId);
  }

  @Get('/cancelTimeOutByAdmin/:senderId/:channelId/:userId')
  cancelTimeOutByAdmin(@Param('senderId') senderId: string, @Param('channelId') channelId: string
    , @Param('userId') userId: string) {
    return this.channelService.cancelTimeOutByAdmin(senderId, channelId, userId);
  }
}
