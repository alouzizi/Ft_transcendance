import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";
export declare class MyGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private clients;
    private rooms;
    onModuleInit(): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
    updatePaddle(data: any): void;
    identifyClient(client: Socket, id: any): void;
}
