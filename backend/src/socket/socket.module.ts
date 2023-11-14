import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketGatewayService } from './socket.service';
import { MessagesService } from 'src/messages/messages.service';
import { UserService } from 'src/user/user.service';
import { ChannelService } from 'src/channel/channel.service';
import { PongServise } from 'src/game/game.service';


@Module({
  providers: [SocketGateway, SocketGatewayService, MessagesService, UserService, ChannelService, PongServise],
})
export class SocketGatewayModule { }
