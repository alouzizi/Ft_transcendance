import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";

@WebSocketGateway(4001, {
    // namespace: "game",
  cors: {
    origin: '*',
    // methods: ["GET", "POST"],
  },
})
export class MyGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;
  
	private clients: Map<string, Socket> = new Map();
  private rooms: string[]= [];

  onModuleInit() {
    
  }

  handleDisconnect(client: Socket) {
    console.log("client is Disconnected <>")
  }
  
  handleConnection(client: Socket) {
    console.log("client is connected <>")
  }

  @SubscribeMessage("updatePaddle")
  updatePaddle(@MessageBody() data: any) {
    console.log("updatePaddle");
    this.server.emit("updatePaddle", data);
  }


  @SubscribeMessage("clientId")
  identifyClient(client: Socket, id: any) {
    console.log({id: id, sockId: client.id});
    if(!this.clients.has(id)) {
      this.clients.set(id, client);
    }
    else{
      client.emit("alreadyExist");
      console.log("alreadyExist");
    }
    if(this.clients.size === 2) {
      console.log("2 clients");
      const roomName = `room-${Date.now()}`;
      this.rooms.push(roomName);
      const clientsArray = Array.from(this.clients.values()).slice(0, 2);
      clientsArray.forEach((client) => {
        console.log({SocketId: client.id, roomName: roomName})
        client.join(roomName);
        client.emit("startGame");
      });
      this.server.to(roomName).emit("startGame");
      this.clients.clear();
    }
  }
}