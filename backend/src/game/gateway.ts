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
    origin: '*', // Change to your frontend URL
    methods: ["GET", "POST"],
  },
})
export class MyGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;
  
  
  onModuleInit() {
    
  }

  handleDisconnect(client: Socket) {
    console.log("client is Disconnected <>")
  }
  
  handleConnection(client: Socket) {
    console.log("client is connected <>")
  }

  @SubscribeMessage("clientId")
  identifyClient(client: Socket, id: any) {
	console.log({id: id, client: client.id});
  console.log("emit 2 times");
  }
}