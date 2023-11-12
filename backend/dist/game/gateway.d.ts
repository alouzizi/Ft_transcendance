import { OnModuleInit } from "@nestjs/common";
import { PongServise } from "./game.service";
import { Socket, Server } from "socket.io";
import { BallDto, PaddleDto } from "./dto/game.tdo";
export declare class MyGateway implements OnModuleInit {
    private PongService;
    server: Server;
    player1: PaddleDto;
    player2: PaddleDto;
    ball: BallDto;
    constructor(PongService: PongServise);
    private GameInit;
    private clients;
    private rooms;
    private ballPositionInterval;
    newRoom: string[];
    onModuleInit(): void;
    collision(ball: any, player: any): boolean;
    identifyClient(client: Socket, id: string): void;
    startEmittingBallPosition(roomName: string): void;
    stopEmittingBallPosition(): void;
    handleJoinRoom(client: Socket, id: string): void;
    findRoomByClientId(id: string): string;
    onUpdatePaddle(client: Socket, data: any): void;
}
