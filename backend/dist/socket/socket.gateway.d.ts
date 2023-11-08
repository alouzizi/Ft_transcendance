import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
import { SocketGatewayService } from './socket.service';
export declare class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private socketGatewayService;
    private messagesService;
    constructor(socketGatewayService: SocketGatewayService, messagesService: MessagesService);
    wss: Server;
    afterInit(server: any): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    createMessage(createMessageDto: CreateMessageDto): Promise<void>;
    updateData(ids: CreateMessageDto): Promise<void>;
    isTyping(ids: CreateMessageDto): Promise<void>;
}
