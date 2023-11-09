import { OnModuleInit } from "@nestjs/common";
import { Socket, Server } from "socket.io";
export declare class MyGateway implements OnModuleInit {
    server: Server;
    private clients;
    private rooms;
    onModuleInit(): void;
    identifyClient(client: Socket, id: string): void;
    handleJoinRoom(client: Socket, id: string): void;
}
