"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyGateway = void 0;
const game_service_1 = require("./game.service");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let MyGateway = class MyGateway {
    constructor(PongService) {
        this.PongService = PongService;
        this.clients = new Map();
        this.rooms = new Map();
        this.newRoom = [];
        this.GameInit();
    }
    GameInit() {
        this.player1 = {
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
    onModuleInit() { }
    collision(ball, player) {
        ball.top = ball.y - ball.radius;
        ball.bottom = ball.y + ball.radius;
        ball.left = ball.x - ball.radius;
        ball.right = ball.x + ball.radius;
        let top = player.y;
        let bottom = player.y + player.height;
        let left = player.x;
        let right = player.x + player.width;
        return (ball.right > left &&
            ball.bottom > top &&
            ball.left < right &&
            ball.top < bottom);
    }
    identifyClient(client, id) {
        console.log({ id: id, client: client.id });
        if (this.clients.has(id)) {
            client.emit("alreadyExist");
            console.log("Client already exists");
        }
        else {
            console.log("Client identified", { id: id });
            this.clients.set(id, client);
            client.join(id);
        }
    }
    startEmittingBallPosition(roomName) {
        clearInterval(this.ballPositionInterval);
        this.ballPositionInterval = setInterval(() => {
            console.log(this.player1.x, this.player1.y, this.player2.x, this.player2.y);
            this.ball.x += this.ball.velocityX;
            this.ball.y += this.ball.velocityY;
            if (this.ball.y + this.ball.radius > 400 ||
                this.ball.y - this.ball.radius < 0) {
                this.ball.velocityY = -this.ball.velocityY;
            }
            let user = this.ball.x < 600 / 2 ? this.player1 : this.player2;
            if (this.collision(this.ball, user)) {
                let collidePoint = this.ball.y - (user.y + user.height / 2);
                collidePoint = collidePoint / (user.height / 2);
                let angleRad = (collidePoint * Math.PI) / 4;
                let direction = this.ball.x < 600 / 2 ? 1 : -1;
                this.ball.velocityX = direction * this.ball.speed * Math.cos(angleRad);
                this.ball.velocityY = this.ball.speed * Math.sin(angleRad);
                if (this.ball.speed + 0.5 > 15)
                    this.ball.speed = 15;
                else
                    this.ball.speed += 0.5;
            }
            if (this.ball.x - this.ball.radius <= 0) {
                this.PongService.resetBall(this.ball);
                this.player2.score++;
                this.server.to(roomName).emit("updateScore", this.player1.score, this.player2.score);
            }
            else if (this.ball.x + this.ball.radius >= 600) {
                this.PongService.resetBall(this.ball);
                this.player1.score++;
                this.server.to(roomName).emit("updateScore", this.player1.score, this.player2.score);
            }
            this.server.to(roomName).emit("updateTheBall", this.ball);
        }, 20);
    }
    stopEmittingBallPosition() {
        clearInterval(this.ballPositionInterval);
    }
    handleJoinRoom(client, id) {
        console.log({ size: this.clients.size });
        if (this.clients.size === 2) {
            console.log("2 clients connected");
            const roomName = `room-${Date.now()}`;
            const clientArray = Array.from(this.clients.keys());
            const clientArray2 = Array.from(this.clients.values());
            this.rooms.set(roomName, clientArray);
            clientArray.forEach((client) => {
                if (id === client) {
                    this.server.to(client).emit("whichSide", true);
                }
                else {
                    this.server.to(client).emit("whichSide", false);
                }
            });
            clientArray2.forEach((client) => {
                client.join(roomName);
            });
            this.server.to(roomName).emit("startGame", roomName);
            this.PongService.resetBall(this.ball);
            this.startEmittingBallPosition(roomName);
            this.clients.clear();
        }
    }
    findRoomByClientId(id) {
        let roomName;
        this.rooms.forEach((clients, room) => {
            if (clients.includes(id)) {
                roomName = room;
            }
        });
        return roomName;
    }
    onUpdatePaddle(client, data) {
        if (data.room) {
            const clientsRoom = this.rooms.get(data.room);
            if (clientsRoom) {
                const otherClient = clientsRoom.find((c) => c !== data.userId);
                if (otherClient) {
                    if (data.isLeft)
                        this.player1 = data.paddle;
                    else
                        this.player2 = data.paddle;
                    this.server.to(otherClient).emit("resivePaddle", data.paddle);
                }
            }
        }
    }
};
exports.MyGateway = MyGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MyGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("clientId"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "identifyClient", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updatePaddle"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "onUpdatePaddle", null);
exports.MyGateway = MyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(4001, {
        cors: {
            origin: "http://localhost:3000",
        },
    }),
    __metadata("design:paramtypes", [game_service_1.PongServise])
], MyGateway);
//# sourceMappingURL=gateway.js.map