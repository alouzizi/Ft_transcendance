import { MessagesService } from 'src/messages/messages.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Server, Socket } from 'socket.io';
export declare class GatewayService {
    private messagesService;
    private prisma;
    constructor(messagesService: MessagesService, prisma: PrismaService);
    handleConnection(client: Socket, wss: Server): Promise<void>;
}
