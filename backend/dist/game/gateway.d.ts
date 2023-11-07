import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";
export declare class MyGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    onModuleInit(): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
    identifyClient(client: Socket, id: any): void;
}
