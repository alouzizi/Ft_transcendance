import { OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessagesService } from "src/messages/messages.service";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";
import { SocketGatewayService } from "./socket.service";
import { PrismaService } from "src/prisma/prisma.service";
import { GameService } from "src/game/game.service";
export declare class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private socketGatewayService;
    private messagesService;
    private gameService;
    private prisma;
    constructor(socketGatewayService: SocketGatewayService, messagesService: MessagesService, gameService: GameService, prisma: PrismaService);
    server: Server;
    afterInit(server: any): void;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    createMessage(createMessageDto: CreateMessageDto): Promise<void>;
    updateData(ids: CreateMessageDto): Promise<void>;
    isTyping(ids: CreateMessageDto): Promise<void>;
    ROUND_LIMIT: number;
    joindRoom: number;
    private GameInit;
    private clients;
    private joindClients;
    private rooms;
    private roomState;
    private ballPositionInterval;
    onModuleInit(): void;
    collision(ball: any, player: any): boolean;
    startEmittingBallPosition(roomName: string, id: string): Promise<void>;
    gameState(roomName: string, p1: {
        player: string;
        score: number;
    }, p2: {
        player: string;
        score: number;
    }): Promise<void>;
    stopEmittingBallPosition(roomName: string): Promise<void>;
    identifyClient(client: Socket, id: string): void;
    handleJoinRoom(client: Socket, id: string): void;
    findRoomByClientId(id: string): string;
    onUpdatePaddle(client: Socket, data: any): void;
    onOpponentLeft(client: Socket, data: any): void;
    private inviteRoom;
    onIvite(client: Socket, data: any): void;
    onAccept(client: Socket, data: any): void;
}
