import { OnModuleInit } from "@nestjs/common";
import { PongServise } from "./game.service";
import { Socket, Server } from "socket.io";
export declare class MyGateway implements OnModuleInit {
    private PongService;
    ROUND_LIMIT: number;
    server: Server;
    constructor(PongService: PongServise);
    private GameInit;
    private clients;
    private rooms;
    private roomState;
    private ballPositionInterval;
    joinedRoom: number;
    onModuleInit(): void;
    collision(ball: any, player: any): boolean;
    identifyClient(client: Socket, id: string): void;
    startEmittingBallPosition(roomName: string): void;
    gameState(roomName: string, score1: number, score2: number): void;
    stopEmittingBallPosition(roomName: string): void;
    handleJoinRoom(client: Socket, id: string): void;
    findRoomByClientId(id: string): string;
    onUpdatePaddle(client: Socket, data: any): void;
}
