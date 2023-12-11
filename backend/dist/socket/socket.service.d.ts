import { PrismaService } from "src/prisma/prisma.service";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";
export declare class SocketGatewayService {
    private prisma;
    constructor(prisma: PrismaService);
    handleConnection(client: Socket, wss: Server): Promise<void>;
    handleDisconnect(client: Socket, wss: Server): Promise<void>;
    updateStatusGeust(senderId: string, wss: Server): Promise<void>;
    updateData(ids: CreateMessageDto, wss: Server): Promise<void>;
    emitNewMessage(ids: CreateMessageDto, wss: Server): Promise<void>;
    updateChannel(ids: CreateMessageDto, wss: Server): Promise<void>;
    mutedUserInChannel(idChannel: string, wss: Server): Promise<void>;
    changeStatusMember(idChannel: string, wss: Server): Promise<void>;
    kickedFromChannel(ids: any, wss: Server): Promise<void>;
    messagsSeenEmit(ids: CreateMessageDto, wss: Server): Promise<void>;
}
