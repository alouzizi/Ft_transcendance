import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	WebSocketServer,
	ConnectedSocket,
  } from "@nestjs/websockets";
  import { Socket, Server } from "socket.io";
  import { OnModuleInit } from "@nestjs/common";
  import { join } from "path";
  
  @WebSocketGateway(4001, {
	  // namespace: "game",
	cors: {
	  origin: "http://localhost:3000", // Change to your frontend URL
	  methods: ["GET", "POST"],
	},
  })
  
  // export class MyGateway implements OnModuleInit {
  //   @WebSocketServer()
  //   server: Server;
  
    // onModuleInit() {
    //   this.server.on('connection', (socket) => {
    //     console.log({ sockId: socket.id });
    //     console.log('connected');
    //   });
    // }
  
  //   @SubscribeMessage('updatePaddle')
  //   onUpdatePaddle(client: Socket, data: any) {
  //     // Broadcast the paddle position to all connected clients
  //     this.server.emit('updatePaddle', data);
  //   }
  
  //   @SubscribeMessage('joinRoom')
  //   handleJoinRoom(client: Socket, room: string) {
  //     console.log('joinRoom', room);
  //     client.join(room);
  //     client.emit('joinedRoom', room);
  //   }
  
  //   @SubscribeMessage('leaveRoom')
  //   handleLeaveRoom(client: Socket, room: string) {
  //     console.log('leaveRoom', room);
  //     client.leave(room);
  //     client.emit('leftRoom', room);
  //   }
  // }
  export class MyGateway implements OnModuleInit {
	@WebSocketServer()
	server: Server;
  
	private clients: Map<string, Socket> = new Map();
	private rooms: Map<string, Socket[]> = new Map();
  
	onModuleInit() {}
  
	@SubscribeMessage("clientId")
	identifyClient(client: Socket, id: any) {
	  console.log("client id:", id);
	  if (!this.clients.has(id)) {
		this.clients.set(id, client);
	  }
	  if (this.clients.size === 2) {
		const roomName = `room-${Date.now()}`;
		const clientsArray = Array.from(this.clients.values()).slice(0, 2);
		this.rooms.set(roomName, clientsArray);
		clientsArray.forEach((client) => {
			client.join(roomName);
			client.emit("joinedRoom", roomName);
			console.log({ joinedRoom: roomName });
			client.emit('startGame');
		});
		this.clients.clear();
		// this.server.emit('startGame');
	  }
	}
  
	findRoomByClient(client: Socket): string | undefined {
	  return Array.from(this.rooms.entries()).find(([roomName, roomClients]) =>
		roomClients.includes(client)
	  )?.[0];
	}
  
	@SubscribeMessage("updatePaddle")
	onUpdatePaddle(client: Socket, data: any) {
	  // console.log('updatePaddle', data);
	  const roomName = this.findRoomByClient(client);
  
	  if (roomName) {
		const room = this.rooms.get(roomName);
	  //   room.emit()
	  //   const otherClient = room.find((c) => c !== client);
	  //   if (otherClient) {
	  //     console.log("other client is here");
	  //     otherClient.emit("resivePaddle", data.paddle);
	  //   }
	  }
	}
  
	@SubscribeMessage('disconnecting')
	handleDisconnect(client: Socket) {
	  const roomName = this.findRoomByClient(client);
	  console.log("client Disconected");
	  if (roomName) {
		  // Remove the disconnected client from the room
		  if (this.rooms.has(roomName)) {
			const clientsInRoom = this.rooms.get(roomName);
			this.rooms.set(roomName, clientsInRoom.filter((c) => c !== client));
	  
			// Check if the room is now empty after removing the disconnected client
			if (this.rooms.get(roomName).length === 0) {
			  // The room is now empty, remove it from the map
			  this.rooms.delete(roomName);
			}
		  }
		}
	}
  
  //   cleanupRoom(roomName: string) {
  //     if (this.rooms.has(roomName)) {
  //       const clientsInRoom = this.rooms.get(roomName);
  
  //       // Notify clients that the game is over or perform other cleanup tasks
  
  //       // Remove the room from the map
  //       this.rooms.delete(roomName);
  //     }
  //   }
  
  }