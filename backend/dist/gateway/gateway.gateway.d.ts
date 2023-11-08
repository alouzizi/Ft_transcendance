import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessagesService } from 'src/messages/messages.service';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
export declare class Gateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private messagesService;
    private prisma;
    constructor(messagesService: MessagesService, prisma: PrismaService);
    wss: Server;
    afterInit(server: any): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: any): Promise<void>;
    createMessage(createMessageDto: CreateMessageDto): Promise<void>;
    updateData(ids: CreateMessageDto): Promise<void>;
    isTyping(ids: CreateMessageDto): Promise<void>;
}
