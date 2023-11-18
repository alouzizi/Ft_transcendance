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
import { PongServise } from "src/game/game.service";
import { BallDto, PaddleDto } from "src/game/dto/game.tdo";
import { PrismaService } from "src/prisma/prisma.service";
import { HixcoderService } from "src/hixcoder/hixcoder.service";
import { on } from "events";

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private PongService: PongServise,
    private socketGatewayService: SocketGatewayService,
    private messagesService: MessagesService,
    private hixcoder: HixcoderService,
    private prisma: PrismaService
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log("Gateway Initialized");
  }

  async handleConnection(client: Socket) {
    this.socketGatewayService.handleConnection(client, this.server);
  }

  async handleDisconnect(client: Socket) {
    this.socketGatewayService.handleDisconnect(client, this.server);
    if (this.clients.has(client.id)) {
      console.log("Client disconnected", { id: client.id });
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

  @SubscribeMessage("isTyping")
  async isTyping(@MessageBody() ids: CreateMessageDto) {
    this.server.to(ids.receivedId).emit("isTyping", ids);
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

  onModuleInit() {}

  collision(ball: any, player: any) {
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;

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


  startEmittingBallPosition(roomName: string, id: string) {
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
        let user: any = ro.ball.x < 600 / 2 ? ro.player1 : ro.player2;
        if (this.collision(ro.ball, user)) {
          let collidePoint = ro.ball.y - (user.y + user.height / 2);
          collidePoint = collidePoint / (user.height / 2);
          let angleRad = (collidePoint * Math.PI) / 4;
          let direction = ro.ball.x < 600 / 2 ? 1 : -1;
          ro.ball.velocityX = direction * ro.ball.speed * Math.cos(angleRad);
          ro.ball.velocityY = ro.ball.speed * Math.sin(angleRad);
          // ball.speed += 0.5;
          if (ro.ball.speed + 0.5 > 15) ro.ball.speed = 15;
          else ro.ball.speed += 0.5;
        }
        if (ro.ball.x - ro.ball.radius <= 0) {
          this.PongService.resetBall(ro.ball);
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
              { player: this.rooms.get(roomName)[1], score: ro.player1.score },
              { player: this.rooms.get(roomName)[0], score: ro.player2.score }
            );
        } else if (ro.ball.x + ro.ball.radius >= 600) {
      
          this.PongService.resetBall(ro.ball);
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
              { player: this.rooms.get(roomName)[1], score: ro.player2.score }
            );
          else
            this.gameState(
              roomName,
              { player: this.rooms.get(roomName)[1], score: ro.player1.score },
              { player: this.rooms.get(roomName)[0], score: ro.player2.score }
            );
        }
        this.server.to(roomName).emit("updateTheBall", ro.ball);
      }, 20)
    );
  }

  async gameState(
    roomName: string,
    p1: { player: string; score: number },
    p2: { player: string; score: number }
  ) {

    if (p1.score + p2.score === this.ROUND_LIMIT) {
      const player1Usr = await this.prisma.user.findUnique({
        where: {
          id: p1.player,
        },
      });
      const player2Usr = await this.prisma.user.findUnique({
        where: {
          id: p2.player,
        },
      });
      if (p1.score == p2.score) {
        console.log(p1.player, p2.player);
        this.server.to(roomName).emit("gameOver", "draw");
      }
      if (p1.score > p2.score) {
        console.log(p1.player, p2.player);
        this.server.to(p1.player).emit("gameOver", "win");
        this.server.to(p2.player).emit("gameOver", "lose");
      } else {
        console.log(p1.player, p2.player);
        this.server.to(p1.player).emit("gameOver", "lose");
        this.server.to(p2.player).emit("gameOver", "win");
      }
      this.hixcoder.updateGameHistory(
        player1Usr.nickname,
        player2Usr.nickname,
        p1.score.toString(),
        p2.score.toString()
      );
      this.stopEmittingBallPosition(roomName);
    }
  }

  stopEmittingBallPosition(roomName: string) {
    clearInterval(this.ballPositionInterval.get(roomName));
  }



  @SubscribeMessage("clientId")
  identifyClient(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    // console.log("client ---> ", client, id);

    // console.log({ id: id, client: client.id });

    if (this.clients.has(id)) {
      client.emit("alreadyExist");
    } else {
      console.log("Client identified", { id: id });

      this.clients.set(id, client);
      this.joindClients.set(id, 0);

      client.join(id);
    }
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, @MessageBody() id: string) {
    this.joindRoom++;
    if (this.clients.size === 2 && this.joindRoom > 1 ) {
      this.joindRoom = 0;
      console.log("2 clients connected");
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
      // this.PongService.startGame();
      this.GameInit(roomName);
      this.PongService.resetBall(this.roomState.get(roomName).ball);
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
          if (data.isLeft) this.roomState.get(data.room).player1.y = data.paddle;
          else this.roomState.get(data.room).player2.y = data.paddle;
          this.server.to(otherClient).emit("resivePaddle", data.paddle);
        }
      }
    }
  }

  @SubscribeMessage("opponentLeft")
  onOpponentLeft(client: Socket, data: any) {
    console.log(data);
    console.log("opponentLeft");
    if (data.room) {
      const clientsRoom = this.rooms.get(data.room);
      if (clientsRoom) {
        const otherClient = clientsRoom.find((c) => c !== data.userId);
        if (otherClient) {
          console.log("opponentLeft send");
          this.server.to(otherClient).emit("opponentLeft");
          client.leave(data.room);
          delete this.joindRoom[otherClient];
        }
      }
    }
    console.log("opponentLeft end");

    delete this.rooms[data.room];
    delete this.roomState[data.room];
    delete this.ballPositionInterval[data.room];
    delete this.joindClients[data.userId];
    this.stopEmittingBallPosition(data.room);
  }
}


interface RoomState {
  player1: PaddleDto;
  player2: PaddleDto;
  ball: BallDto;
}
