import { OnModuleInit } from "@nestjs/common";
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from "@nestjs/websockets";

import { Socket, Server } from "socket.io";

@WebSocketGateway(4001, {
  cors: {
    origin: "http://localhost:3000",
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, Socket> = new Map();
  private rooms: Map<string, string[]> = new Map();

  onModuleInit() {}

  @SubscribeMessage("clientId")
  identifyClient(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    console.log({ id: id, client: client.id });

    if (this.clients.has(id)) {
      client.emit("alreadyExist");
      console.log("Client already exists");
    } else {
      console.log("Client identified", { id: id });

      this.clients.set(id, client);

      client.join(id);
    }
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    // console.log('client joined room <--------------------->');
    console.log({ size: this.clients.size });

    if (this.clients.size === 2) {
      console.log("2 clients connected");
      const roomName = `room-${Date.now()}`;

      const clientArray = Array.from(this.clients.keys());
      this.rooms.set(roomName, clientArray);
      clientArray.forEach((client) => {
        console.log({ client: client });

        this.server.to(client).emit("startGame", roomName);
      });
      this.clients.clear();
    }
  }

  findRoomByClientId(id: string) {
    let roomName: string;
    this.rooms.forEach((clients, room) => {
      if (clients.includes(id)) {
        roomName = room;
      }
    });
    return roomName;
	}

  @SubscribeMessage("updatePaddle")
  onUpdatePaddle(client: Socket, data: any) {
    // console.log('updatePaddle', data);
    const roomName = this.findRoomByClientId(data.id);

    if (roomName) {
      const clients = this.rooms.get(roomName);
      //   room.emit()
      //   const otherClient = room.find((c) => c !== client);
      //   if (otherClient) {
      //     console.log("other client is here");
      //     otherClient.emit("resivePaddle", data.paddle);
      //   }
    }
  }
}

