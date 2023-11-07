import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from "@nestjs/websockets";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { Server, Socket } from "socket.io";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
export declare class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private messagesService;
    private prisma;
    private userService;
    constructor(messagesService: MessagesService, prisma: PrismaService, userService: UserService);
    wss: Server;
    afterInit(server: any): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: any): Promise<void>;
    createMessage(createMessageDto: CreateMessageDto): Promise<void>;
    updateData(ids: CreateMessageDto): Promise<void>;
    isTyping(ids: CreateMessageDto): Promise<void>;
}
