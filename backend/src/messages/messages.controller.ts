import { Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('messages')
@UseGuards(JwtGuard)
export class MessageController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get('getDirectMessage/:send/:rec')
  async getDirectMessage(@Param('send') send: string, @Param('rec') rec: string) {
    return this.messagesService.getDirectMessage(send, rec);
  }


  @Get('getChannelMessage/:send/:channelId')
  async getChannelMessage(@Param('send') send: string, @Param('channelId') channelId: string) {
    return this.messagesService.getChannelMessage(send, channelId);
  }


  @Get('/getUserForMsg/:id')
  async getUserForMsg(@Param('id') senderId: string) {
    return await this.messagesService.getMessageForList(senderId);
  }

}
