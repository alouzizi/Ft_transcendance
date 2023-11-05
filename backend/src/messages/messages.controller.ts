import { Controller, Get, Param, Post, Req } from "@nestjs/common";
import { MessagesService } from "./messages.service";

@Controller("messages")
export class MessageController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(":send/:rec")
  async getMessages(@Param("send") send: string, @Param("rec") rec: string) {
    return this.messagesService.getMessage(send, rec);
  }
}
