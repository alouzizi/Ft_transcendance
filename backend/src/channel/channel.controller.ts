import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { ChannelType } from '@prisma/client';
import { diskStorage } from "multer";
import { JwtGuard } from 'src/auth/guard';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) { }

  @Post('/createChannel/:senderId')
  @UseGuards(JwtGuard)
  createChannel(@Body() createChannelDto: any,
    @Param('senderId') senderId: string) {
    const channelData: CreateChannelDto = {
      ...createChannelDto,
      channelType: (createChannelDto.channelType == 'Private') ? ChannelType.Private : ChannelType.Public,
    }
    return this.channelService.createChannel(channelData, senderId);
  }

  @Post('/updateChannel/:senderId/:channelId')
  @UseGuards(JwtGuard)
  updateChannel(@Body() createChannelDto: any,
    @Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    const channelData: CreateChannelDto = {
      ...createChannelDto,
      channelType: (createChannelDto.channelType == 'Private') ? ChannelType.Private : ChannelType.Public,
    }
    return this.channelService.updateChannel(senderId, channelId, channelData);
  }


  @Post("/uploadImage/:senderId/:channelId")
  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
  checkOwnerIsAdmin(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.checkOwnerIsAdmin(senderId, channelId);
  }

  @Get('/checkUserIsInChannel/:senderId/:channelId')
  @UseGuards(JwtGuard)
  checkUserIsInChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.checkUserIsInChannel(senderId, channelId);
  }

  @Get('/addUserToChannel/:senderId/:channelId/:userId')
  @UseGuards(JwtGuard)
  addUserToChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.addUserToChannel(senderId, channelId, userId);
  }

  @Get('/getChannel/:senderId/:channelId')
  @UseGuards(JwtGuard)
  getChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.getChannel(senderId, channelId);
  }

  @Get('/getMembersChannel/:id')
  @UseGuards(JwtGuard)
  getMembersChannel(@Param('id') id: string) {
    return this.channelService.getMembersChannel(id);
  }


  @Get('/changeStatusAdmin/:senderId/:channelId/:userId')
  @UseGuards(JwtGuard)
  changeStatusAdmin(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.changeStatusAdmin(senderId, channelId, userId);
  }

  @Get('/kickmember/:senderId/:channelId/:userId')
  @UseGuards(JwtGuard)
  kickMember(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.KickMember(senderId, channelId, userId);
  }

  @Get('/bannedmember/:senderId/:channelId/:userId')
  @UseGuards(JwtGuard)
  banMember(@Param('senderId') senderId: string, @Param('channelId') channelId: string, @Param('userId') userId: string) {
    return this.channelService.changeStatutsBanned(senderId, channelId, userId);
  }


  @Get('/leaveChannel/:senderId/:channelId')
  @UseGuards(JwtGuard)
  leaveChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.leaveChannel(senderId, channelId);
  }


  @Get('/validePassword/:senderId/:channelId/:password')
  @UseGuards(JwtGuard)
  validePassword(@Param('senderId') senderId: string, @Param('channelId') channelId: string
    , @Param('password') password: string) {
    return this.channelService.validePassword(senderId, channelId, password);
  }


  @Get('/getValideChannels/:senderId')
  @UseGuards(JwtGuard)
  getValideChannels(@Param('senderId') senderId: string) {
    return this.channelService.getValideChannels(senderId);
  }

  @Get('/joinChannel/:senderId/:channelId/')
  @UseGuards(JwtGuard)
  joinChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.joinChannel(senderId, channelId);
  }

  @Get('/muteUserChannel/:senderId/:channelId/:userId/:timer')
  @UseGuards(JwtGuard)
  muteUserChannel(@Param('senderId') senderId: string, @Param('channelId') channelId: string,
    @Param('userId') userId: string, @Param('timer') timer: string) {
    return this.channelService.muteUserFromChannel(senderId, channelId, userId, timer);
  }


  @Get('/checkIsMuted/:senderId/:channelId')
  @UseGuards(JwtGuard)
  checkIsMuted(@Param('senderId') senderId: string, @Param('channelId') channelId: string) {
    return this.channelService.checkIsMuted(senderId, channelId);
  }

  @Get('/cancelTimeOutByAdmin/:senderId/:channelId/:userId')
  @UseGuards(JwtGuard)
  cancelTimeOutByAdmin(@Param('senderId') senderId: string, @Param('channelId') channelId: string
    , @Param('userId') userId: string) {
    return this.channelService.cancelTimeOutByAdmin(senderId, channelId, userId);
  }
}
