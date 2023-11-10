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
      // client.emit("startGame", -1);
      clientArray.forEach((client) => {
        console.log({ client: client });
        if (id === client) {
        this.server.to(client).emit("startGame", roomName, true);
        } else{
          this.server.to(client).emit("startGame", roomName, false);
        }
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

    if (data.room) {
      const clientsRoom = this.rooms.get(data.room);
      //   room.emit()
      if (clientsRoom) {
        const otherClient = clientsRoom.find((c) => c !== data.userId);
        if (otherClient) {
          console.log({ otherClient: otherClient });
          // otherClient.emit("resivePaddle", data.paddle);
          this.server.to(otherClient).emit("resivePaddle", data.paddle);
        }
      }
    }
  }
}

