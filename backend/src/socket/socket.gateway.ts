import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";
import { MessagesService } from "src/messages/messages.service";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";
import { SocketGatewayService } from "./socket.service";
import { PrismaService } from "src/prisma/prisma.service";
import { GameService } from "src/game/game.service";
import { BallDto, PaddleDto } from "src/game/dto";
// import { PongServise } from "src/game/game.service";

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    // private gameService: PongServise,
    private socketGatewayService: SocketGatewayService,
    private messagesService: MessagesService,
    private gameService: GameService,
    private prisma: PrismaService
  ) { }

  @WebSocketServer() server: Server;

  afterInit(server: any) {
    // //console.log("Gateway Initialized");
  }

  async handleConnection(client: Socket) {
    this.socketGatewayService.handleConnection(client, this.server);
  }

  async handleDisconnect(client: Socket) {
    this.socketGatewayService.handleDisconnect(client, this.server);
    if (this.clients.has(client.id)) {
      this.clients.delete(client.id);
      const room = this.findRoomByClientId(client.id);
      if (room) {
        this.server.to(room).emit("clientDisconnected");
        this.stopEmittingBallPosition(room);
        this.rooms.delete(room);
        this.roomState.delete(room);
      }
    }
  }

  @SubscribeMessage("createMessage")
  async createMessage(@MessageBody() createMessageDto: CreateMessageDto) {
    await this.messagesService.createMessage(this.server, createMessageDto);
  }

  @SubscribeMessage("updateData")
  async updateData(@MessageBody() ids: CreateMessageDto) {
    this.socketGatewayService.updateData(ids, this.server);
  }


  @SubscribeMessage("updateStatusGeust")
  async updateStatusGeust(@MessageBody() senderId: string) {
    this.socketGatewayService.updateStatusGeust(senderId, this.server);
  }

  @SubscribeMessage("updateChannel")
  async updateChannel(@MessageBody() ids: CreateMessageDto) {
    this.socketGatewayService.updateChannel(ids, this.server);
  }

  @SubscribeMessage("isTyping")
  async isTyping(@MessageBody() ids: CreateMessageDto) {
    this.server.to(ids.receivedId).emit("isTyping", ids);
  }

  @SubscribeMessage("kickedFromChannel")
  async kickedFromChannel(@MessageBody() ids: any) {
    this.socketGatewayService.kickedFromChannel(ids, this.server);
  }

  @SubscribeMessage("emitNewMessage")
  async joinChannelEmit(@MessageBody() ids: CreateMessageDto) {
    this.socketGatewayService.emitNewMessage(ids, this.server);
  }

  @SubscribeMessage("blockUserToUser")
  async blockUserToUser(@MessageBody() ids: CreateMessageDto) {
    this.server.to(ids.receivedId).emit("blockUserToUser", {});
    this.server.to(ids.senderId).emit("blockUserToUser", {});
  }

  @SubscribeMessage("mutedUserInChannel")
  async mutedUserInChannel(@MessageBody() idChannel: string) {
    this.socketGatewayService.mutedUserInChannel(idChannel, this.server);
  }


  @SubscribeMessage("changeStatusMember")
  async changeStatusMember(@MessageBody() idChannel: string) {
    this.socketGatewayService.changeStatusMember(idChannel, this.server);
  }


  @SubscribeMessage("messagsSeenEmit")
  async messagsSeenEmit(@MessageBody() ids: CreateMessageDto) {
    this.socketGatewayService.messagsSeenEmit(ids, this.server);
  }




  ROUND_LIMIT = 6;
  joindRoom = 0;
  private GameInit(roomName: string) {
    this.roomState.set(roomName, {
      player1: {
        x: 10,
        y: 0,
        width: 10,
        height: 100,
        color: "#FFF",
        score: 0,
      },
      player2: {
        x: 600 - 15,
        y: 400 / 2 - 100 / 2,
        width: 10,
        height: 100,
        color: "#FFF",
        score: 0,
      },
      ball: {
        x: 0,
        y: 0,
        radius: 10,
        speed: 5,
        velocityX: 5,
        velocityY: 5,
        color: "#05EDFF",
      },
    });
  }

  private clients: Map<string, Socket> = new Map();
  private joindClients: Map<string, number> = new Map();
  private rooms: Map<string, string[]> = new Map();
  private roomState: Map<string, RoomState> = new Map();
  private ballPositionInterval: Map<string, NodeJS.Timeout> = new Map();

  onModuleInit() { }

  collision(ball: any, player: any) {
    ball.top = ball.y - (ball.radius + 1);
    ball.bottom = ball.y + (ball.radius + 1);
    ball.left = ball.x - (ball.radius + 1);
    ball.right = ball.x + (ball.radius + 1);

    let top = player.y;
    let bottom = player.y + player.height;
    let left = player.x;
    let right = player.x + player.width;

    return (
      ball.right > left &&
      ball.bottom > top &&
      ball.left < right &&
      ball.top < bottom
    );
  }

  async startEmittingBallPosition(roomName: string, id: string) {
    const notherId = this.rooms.get(roomName).find((c) => c !== id);

    await this.prisma.user.update({
      where: { id: notherId },
      data: { inGaming: true },
    });

    await this.prisma.user.update({
      where: { id: id },
      data: { inGaming: true },
    });

    const users = await this.prisma.user.findMany();
    for (const user of users) {
      this.server.to(user.id).emit("updateStatusGeust", {});
    }
    clearInterval(this.ballPositionInterval.get(roomName));

    this.ballPositionInterval.set(
      roomName,
      setInterval(() => {
        const ro = this.roomState.get(roomName);
        ro.ball.x += ro.ball.velocityX;
        ro.ball.y += ro.ball.velocityY;
        if (
          ro.ball.y + ro.ball.radius > 400 ||
          ro.ball.y - ro.ball.radius < 0
        ) {
          ro.ball.velocityY = -ro.ball.velocityY;

        }
        if (ro.ball.y + ro.ball.radius > 400) {

          ro.ball.y -= 10;
          // ro.ball.velocityX = -ro.ball.velocityX;
        } else if (ro.ball.y - ro.ball.radius < 0) {
          // ro.ball.velocityY = -ro.ball.velocityY
          ro.ball.y += 10;
        }
        let user: any = ro.ball.x < 600 / 2 ? ro.player1 : ro.player2;
        if (this.collision(ro.ball, user)) {
          let collidePoint = ro.ball.y - (user.y + user.height / 2);
          collidePoint = collidePoint / (user.height / 2);
          let angleRad = (Math.PI / 4) * collidePoint;
          let direction = ro.ball.x < 600 / 2 ? 1 : -1;
          ro.ball.velocityX = direction * ro.ball.speed * Math.cos(angleRad);
          ro.ball.velocityY = ro.ball.speed * Math.sin(angleRad);
          // ball.speed += 0.5;
          if (ro.ball.speed + 0.5 > 15) ro.ball.speed = 15;
          else ro.ball.speed += 0.5;
        }
        if (ro.ball.x - ro.ball.radius <= 0) {
          this.gameService.resetBall(ro.ball);
          // the computer win
          ro.player2.score++;

          // alert("Computer Win");
          this.server
            .to(roomName)
            .emit("updateScore", ro.player1.score, ro.player2.score);

          if (id === this.rooms.get(roomName)[0])
            this.gameState(
              roomName,
              { player: id, score: ro.player1.score },
              { player: this.rooms.get(roomName)[1], score: ro.player2.score }
            );
          else
            this.gameState(
              roomName,
              { player: this.rooms.get(roomName)[1], score: ro.player2.score },
              { player: this.rooms.get(roomName)[0], score: ro.player1.score }
            );
          // this.gameState(roomName, ro.player1.score, ro.player2.score);
        } else if (ro.ball.x + ro.ball.radius >= 600) {
          this.gameService.resetBall(ro.ball);
          // alert("You Win");
          // the user win
          ro.player1.score++;
          this.server
            .to(roomName)
            .emit("updateScore", ro.player1.score, ro.player2.score);
          if (id === this.rooms.get(roomName)[0])
            this.gameState(
              roomName,
              { player: id, score: ro.player1.score },
              { player: this.rooms.get(roomName)[1], score: ro.player1.score }
            );
          else
            this.gameState(
              roomName,
              { player: this.rooms.get(roomName)[1], score: ro.player2.score },
              { player: this.rooms.get(roomName)[0], score: ro.player1.score }
            );
          // this.gameState(roomName, ro.player1.score, ro.player2.score);
        }
        this.server.to(roomName).emit("updateTheBall", ro.ball);
      }, 25)
    );
  }

  async gameState(
    roomName: string,
    p1: { player: string; score: number },
    p2: { player: string; score: number }
  ) {
    const player1 = this.rooms.get(roomName)[0];
    const player2 = this.rooms.get(roomName)[1];

    if (p1.score + p2.score === this.ROUND_LIMIT) {
      if (p1.score == p2.score) {
        //console.log(player1, player2);
        this.server.to(roomName).emit("gameOver", "draw");
      }
      else if (p1.score > p2.score) {
        //console.log(player1, player2);
        this.server.to(player1).emit("gameOver", "win");
        this.server.to(player2).emit("gameOver", "lose");
      } else {
        //console.log(player1, player2);
        this.server.to(player1).emit("gameOver", "lose");
        this.server.to(player2).emit("gameOver", "win");
      }
      this.gameService.updateGameHistory(
        player1,
        player2,
        p1.score.toString(),
        p2.score.toString()
      );

      this.stopEmittingBallPosition(roomName);
    }
  }
  async stopEmittingBallPosition(roomName: string) {
    if (this.rooms.get(roomName) && this.rooms.get(roomName).length > 1) {
      const id = this.rooms.get(roomName)[0];
      const id2 = this.rooms.get(roomName)[1];
      await this.prisma.user.update({
        where: { id: id },
        data: { inGaming: false },
      });
      await this.prisma.user.update({
        where: { id: id2 },
        data: { inGaming: false },
      });
      const users = await this.prisma.user.findMany();
      for (const user of users) {
        this.server.to(user.id).emit("updateStatusGeust", {});
      }
      delete this.joindClients[id];
      delete this.joindClients[id2];
    }

    // id2.leave(roomName);
    // id2.leave(id2);
    delete this.rooms[roomName];
    delete this.roomState[roomName];
    delete this.ballPositionInterval[roomName];
    clearInterval(this.ballPositionInterval.get(roomName));
  }

  @SubscribeMessage("clientId")
  identifyClient(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    if (this.clients.has(id)) {
      client.emit("alreadyExist");
    } else {
      this.clients.set(id, client);
      this.joindClients.set(id, 0);

      client.join(id);
    }
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, @MessageBody() id: string) {
    this.joindRoom++;
    if (this.clients.size === 2 && this.joindRoom > 1) {
      this.joindRoom = 0;
      const roomName = `room-${Date.now()}`;
      this.rooms.set(roomName, Array.from(this.clients.keys()));
      const clientArray = Array.from(this.clients.keys());
      const clientArray2 = Array.from(this.clients.values());
      this.rooms.set(roomName, clientArray);
      // client.emit("startGame", -1);
      clientArray.forEach((client) => {
        if (id === client) {
          this.server.to(client).emit("whichSide", true);
        } else {
          this.server.to(client).emit("whichSide", false);
        }
      });
      clientArray2.forEach((client) => {
        client.join(roomName);
      });
      // setTimeout(() => {
      this.server.to(roomName).emit("startGame", roomName);
      // this.gameService.startGame();
      this.GameInit(roomName);
      this.gameService.resetBall(this.roomState.get(roomName).ball);
      this.startEmittingBallPosition(roomName, id);
      this.clients.clear();
      // }, 1000);
    }
  }

  // @SubscribeMessage("invite")
  // onInvite(client: Socket, data: any) {

  //   this.
  //   this.server.to(data.userId).emit("invite", data);
  // }
  // }
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
    if (data.room) {
      const clientsRoom = this.rooms.get(data.room);
      if (clientsRoom) {
        const otherClient = clientsRoom.find((c) => c !== data.userId);
        if (otherClient) {
          if (data.isLeft)
            this.roomState.get(data.room).player1.y = data.paddle;
          else this.roomState.get(data.room).player2.y = data.paddle;
          this.server.to(otherClient).emit("resivePaddle", data.paddle);
        }
      }
    }
  }

  @SubscribeMessage("opponentLeft")
  onOpponentLeft(client: Socket, data: any) {
    if (data.room) {
      const clientsRoom = this.rooms.get(data.room);
      if (clientsRoom) {
        const otherClient = clientsRoom.find((c) => c !== data.userId);
        const otherclientValue = this.clients.get(otherClient);
        if (otherClient) {
          this.server.to(otherClient).emit("opponentLeft");
          // otherClient.leave(otherClient);
          // this.stopEmittingBallPosition(data.room);
          // delete this.rooms[data.room];
          // delete this.roomState[data.room];
          // delete this.ballPositionInterval[data.room];
          // delete this.joindRoom[otherClient];
        }
      }
      // otherclientValue.leave(data.room);
      // otherclientValue.leave(otherClient);
      client.leave(data.room);
      client.leave(data.userId);
      client.leave(data.userId);
      client.leave(data.room);
    }

    this.stopEmittingBallPosition(data.room);
    // delete this.rooms[data.room];
    // delete this.roomState[data.room];
    // delete this.ballPositionInterval[data.room];
    // delete this.joindClients[data.userId];
  }

  private inviteRoom: Map<string, Socket> = new Map();

  @SubscribeMessage("invite")
  onIvite(client: Socket, data: any) {
    this.inviteRoom.set(data.userId1, client);
    client.join(data.userId1);

    // this.rooms.set(data.userId1 + data.userId2, [data.userId1, data.userId2]);
    this.server.to(data.userId1).emit("invite", data);
    this.server.to(data.userId2).emit("invite", data);
  }

  @SubscribeMessage("accept")
  onAccept(client: Socket, data: any) {
    this.inviteRoom.set(data.userId2, client);
    client.join(data.userId2);

    this.server.to(data.userId2).emit("accepted", data);
    const roomName = data.userId1 + data.userId2;
    const sockets: Socket[] = [
      this.inviteRoom.get(data.userId1),
      this.inviteRoom.get(data.userId2),
    ];

    this.rooms.set(roomName, [data.userId1, data.userId2]);

    // this.server.to(data.userId1).emit("whichSide", true);
    // this.server.to(data.userId2).emit("whichSide", false);

    sockets.forEach((socket) => {
      socket.join(roomName);
    });

    this.server.to(roomName).emit("startGame", data);
    this.GameInit(roomName);

    this.gameService.resetBall(this.roomState.get(roomName).ball);
    this.startEmittingBallPosition(roomName, data.userId2);
    this.clients.clear();
  }

  @SubscribeMessage("decline")
  onDeclien(client: Socket, Id: any) {
    // this.inviteRoom.set(data.userId1, client);
    // client.join(data.userId1);

    // this.rooms.set(data.userId1 + data.userId2, [data.userId1, data.userId2]);
    this.server.to(Id).emit("declien");
    // this.server.to(data.userId2).emit("declien", data);
  }

  @SubscribeMessage("clear")
  onOut(client: Socket, Id: any) {

    this.clients.delete(Id);
    this.joindClients.delete(Id);
    // this.clients.set(id, client);
    // this.joindClients.set(id, 0);
    // Id.leave(Id);
    // client.join(id);

  }
}

interface RoomState {
  player1: PaddleDto;
  player2: PaddleDto;
  ball: BallDto;
}
