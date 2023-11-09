import { PrismaService } from 'src/prisma/prisma.service';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/messages/dto/create-message.dto';
export declare class SocketGatewayService {
    private prisma;
    constructor(prisma: PrismaService);
    handleConnection(client: Socket, wss: Server): Promise<void>;
    handleDisconnect(client: Socket, wss: Server): Promise<void>;
    updateData(ids: CreateMessageDto, wss: Server): Promise<void>;
}
