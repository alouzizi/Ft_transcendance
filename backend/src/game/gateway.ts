import { OnModuleInit } from "@nestjs/common";
import { PongServise } from "./game.service";

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from "@nestjs/websockets";

import { Socket, Server } from "socket.io";
import { BallDto, PaddleDto } from "./dto/game.tdo";

@WebSocketGateway(4001, {
  cors: {
    origin: "http://localhost:3000",
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
player1: PaddleDto;
player2: PaddleDto;
ball: BallDto;
  
constructor(private PongService: PongServise){
  this.GameInit();
}

  private GameInit(){
  this.player1 ={
      x: 10,
      y: 0,
      width: 10,
      height: 100,
      color: "#FFF",
      score: 0,
  };
      this.player2 = {
      x: 600 - 15,
      y: 400 / 2 - 100 / 2,
      width: 10,
      height: 100,
      color: "#FFF",
      score: 0,
    };
    this.ball = {
      x: 0,
      y: 0,
      radius: 10,
      speed: 5,
      velocityX: 5,
      velocityY: 5,
      color: "#05EDFF",
    };
  }

  // constructor(private PongService: PongServise) {}
  private clients: Map<string, Socket> = new Map();
  private rooms: Map<string, string[]> = new Map();
  private ballPositionInterval: NodeJS.Timeout;

  newRoom:string[] = []; 

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
    clearInterval(this.ballPositionInterval);
    this.ballPositionInterval = setInterval(() => {
      // console.log({layer1: this.player1, player2: this.player2});
      console.log(this.player1.x, this.player1.y, this.player2.x, this.player2.y);
      // this.PongService.startGame(this.ball, this.p1, this.player2);
      this.ball.x += this.ball.velocityX;
      this.ball.y += this.ball.velocityY;
      if (
        this.ball.y + this.ball.radius > 400 ||
        this.ball.y - this.ball.radius < 0
      ) {
        this.ball.velocityY = -this.ball.velocityY;
      }
      let user:any = this.ball.x < 600 / 2 ? this.player1 : this.player2;
      if (this.collision(this.ball, user)) {
        let collidePoint = this.ball.y - (user.y + user.height / 2);
        collidePoint = collidePoint / (user.height / 2);
        // let angleRad = (Math.PI / 4) * collidePoint;
        let angleRad = (collidePoint * Math.PI) / 4;
        let direction = this.ball.x < 600 / 2 ? 1 : -1;
        this.ball.velocityX = direction * this.ball.speed * Math.cos(angleRad);
        this.ball.velocityY = this.ball.speed * Math.sin(angleRad);
        // ball.speed += 0.5;
        if (this.ball.speed + 0.5 > 15) this.ball.speed = 15;
        else this.ball.speed += 0.5;
      }
      if (this.ball.x - this.ball.radius <= 0) {
        this.PongService.resetBall(this.ball);
        // the computer win
        this.player2.score++;
        // alert("Computer Win");
        this.server.to(roomName).emit("updateScore", this.player1.score, this.player2.score);
      } else if (this.ball.x + this.ball.radius >= 600) {
        this.PongService.resetBall(this.ball);
        // alert("You Win");
        // the user win
        this.player1.score++;
        this.server.to(roomName).emit("updateScore", this.player1.score, this.player2.score);
      }
      // const ballPosition = this.PongService.ball;
      this.server.to(roomName).emit("updateTheBall", this.ball);
    }, 20);
  }

  stopEmittingBallPosition() {
    clearInterval(this.ballPositionInterval);
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() id: string) {
    console.log({ size: this.clients.size });

    if (this.clients.size === 2) {
      console.log("2 clients connected");
      const roomName = `room-${Date.now()}`;

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
        this.PongService.resetBall(this.ball);
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
          if(data.isLeft)
            this.player1 = data.paddle;
          else
            this.player2 = data.paddle;
          this.server.to(otherClient).emit("resivePaddle", data.paddle);
        }
      }
    }
  }
}
