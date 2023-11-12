<<<<<<< HEAD
import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessageController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(":send/:rec")
  async getMessages(@Param("send") send: string, @Param("rec") rec: string) {
    return this.messagesService.getMessage(send, rec);
  }
=======
import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
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

>>>>>>> implement the sockets successfully
}
