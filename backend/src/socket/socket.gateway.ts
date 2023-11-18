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

  ROUND_LIMIT = 4;
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
  private rooms: Map<string, string[]> = new Map();
  private roomState: Map<string, RoomState> = new Map();
  private ballPositionInterval: Map<string, NodeJS.Timeout> = new Map();

  // newRoom: string[] = [];

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

  @SubscribeMessage("clientId")
  identifyClient(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    console.log("client ---> ", client, id);
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

  startEmittingBallPosition(roomName: string) {
    clearInterval(this.ballPositionInterval.get(roomName));
    this.ballPositionInterval.set(
      roomName,
      setInterval(() => {
        // console.log({layer1: this.player1, player2: this.player2});
        const ro = this.roomState.get(roomName);
        // console.log(ro.player1.x, ro.player1.y, ro.player2.x, ro.player2.y);
        // ro.PongService.startGame(ro.ball, ro.p1, ro.player2);
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
          // let angleRad = (Math.PI / 4) * collidePoint;
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
          this.gameState(roomName, ro.player1.score, ro.player2.score);
        } else if (ro.ball.x + ro.ball.radius >= 600) {
          this.PongService.resetBall(ro.ball);
          // alert("You Win");
          // the user win
          ro.player1.score++;
          this.server
            .to(roomName)
            .emit("updateScore", ro.player1.score, ro.player2.score);

          this.gameState(roomName, ro.player1.score, ro.player2.score);
        }
        // const ballPosition = ro.PongService.ball;
        this.server.to(roomName).emit("updateTheBall", ro.ball);
      }, 20)
    );
  }

  async gameState(roomName: string, score1: number, score2: number) {
    const player1 = this.rooms.get(roomName)[0];
    const player2 = this.rooms.get(roomName)[1];

    if (score1 + score2 === this.ROUND_LIMIT) {
      if (score1 == score2) {
        console.log(player1, player2);
        this.server.to(roomName).emit("gameOver", "draw");
      }
      if (score1 > score2) {
        console.log(player1, player2);
        this.server.to(player1).emit("gameOver", "win");
        this.server.to(player2).emit("gameOver", "lose");
      } else {
        console.log(player1, player2);
        this.server.to(player1).emit("gameOver", "lose");
        this.server.to(player2).emit("gameOver", "win");
      }
      this.hixcoder.updateGameHistory(
        player1,
        player2,
        score1.toString(),
        score2.toString()
      );

      this.stopEmittingBallPosition(roomName);
    }
  }

  stopEmittingBallPosition(roomName: string) {
    clearInterval(this.ballPositionInterval.get(roomName));
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, @MessageBody() id: string) {
    console.log({ size: this.clients.size });
    this.joindRoom++;
    if (this.clients.size === 2 && this.joindRoom == 2) {
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
      this.startEmittingBallPosition(roomName);
      this.clients.clear();
      // }, 1000);
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
        // this.player2 = data.paddle;
        if (otherClient) {
          // console.log({ otherClient: otherClient });
          // otherClient.emit("resivePaddle", data.paddle);
          // this.PongService.player2 = data.paddle;
          // this.player1 = data.paddle;
          if (data.isLeft) this.roomState.get(data.room).player1 = data.paddle;
          else this.roomState.get(data.room).player2 = data.paddle;
          this.server.to(otherClient).emit("resivePaddle", data.paddle);
        }
      }
    }
  }
}

interface RoomState {
  player1: PaddleDto;
  player2: PaddleDto;
  ball: BallDto;
}
