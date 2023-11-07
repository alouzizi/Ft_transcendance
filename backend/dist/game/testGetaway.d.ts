import { Socket, Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";
export declare class MyGateway implements OnModuleInit {
    server: Server;
    private clients;
    private rooms;
    onModuleInit(): void;
    identifyClient(client: Socket, id: any): void;
    findRoomByClient(client: Socket): string | undefined;
    onUpdatePaddle(client: Socket, data: any): void;
    handleDisconnect(client: Socket): void;
}
