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
exports.SocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messages_service_1 = require("../messages/messages.service");
const create_message_dto_1 = require("../messages/dto/create-message.dto");
const socket_service_1 = require("./socket.service");
const prisma_service_1 = require("../prisma/prisma.service");
const game_service_1 = require("../game/game.service");
let SocketGateway = class SocketGateway {
    constructor(socketGatewayService, messagesService, gameService, prisma) {
        this.socketGatewayService = socketGatewayService;
        this.messagesService = messagesService;
        this.gameService = gameService;
        this.prisma = prisma;
        this.ROUND_LIMIT = 6;
        this.joindRoom = 0;
        this.clients = new Map();
        this.joindClients = new Map();
        this.rooms = new Map();
        this.roomState = new Map();
        this.ballPositionInterval = new Map();
        this.inviteRoom = new Map();
    }
    afterInit(server) {
    }
    async handleConnection(client) {
        this.socketGatewayService.handleConnection(client, this.server);
    }
    async handleDisconnect(client) {
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
    async createMessage(createMessageDto) {
        await this.messagesService.createMessage(this.server, createMessageDto);
    }
    async updateData(ids) {
        this.socketGatewayService.updateData(ids, this.server);
    }
    async updateStatusGeust(senderId) {
        this.socketGatewayService.updateStatusGeust(senderId, this.server);
    }
    async updateChannel(ids) {
        this.socketGatewayService.updateChannel(ids, this.server);
    }
    async isTyping(ids) {
        this.server.to(ids.receivedId).emit("isTyping", ids);
    }
    async kickedFromChannel(ids) {
        this.socketGatewayService.kickedFromChannel(ids, this.server);
    }
    async joinChannelEmit(ids) {
        this.socketGatewayService.emitNewMessage(ids, this.server);
    }
    async blockUserToUser(ids) {
        this.server.to(ids.receivedId).emit("blockUserToUser", {});
        this.server.to(ids.senderId).emit("blockUserToUser", {});
    }
    async mutedUserInChannel(idChannel) {
        this.socketGatewayService.mutedUserInChannel(idChannel, this.server);
    }
    async changeStatusMember(idChannel) {
        this.socketGatewayService.changeStatusMember(idChannel, this.server);
    }
    async messagsSeenEmit(ids) {
        this.socketGatewayService.messagsSeenEmit(ids, this.server);
    }
    GameInit(roomName) {
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
    onModuleInit() { }
    collision(ball, player) {
        ball.top = ball.y - (ball.radius + 1);
        ball.bottom = ball.y + (ball.radius + 1);
        ball.left = ball.x - (ball.radius + 1);
        ball.right = ball.x + (ball.radius + 1);
        let top = player.y;
        let bottom = player.y + player.height;
        let left = player.x;
        let right = player.x + player.width;
        return (ball.right > left &&
            ball.bottom > top &&
            ball.left < right &&
            ball.top < bottom);
    }
    async startEmittingBallPosition(roomName, id) {
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
        this.ballPositionInterval.set(roomName, setInterval(() => {
            const ro = this.roomState.get(roomName);
            ro.ball.x += ro.ball.velocityX;
            ro.ball.y += ro.ball.velocityY;
            if (ro.ball.y + ro.ball.radius > 400 ||
                ro.ball.y - ro.ball.radius < 0) {
                ro.ball.velocityY = -ro.ball.velocityY;
            }
            if (ro.ball.y + ro.ball.radius > 400) {
                ro.ball.y -= 10;
            }
            else if (ro.ball.y - ro.ball.radius < 0) {
                ro.ball.y += 10;
            }
            let user = ro.ball.x < 600 / 2 ? ro.player1 : ro.player2;
            if (this.collision(ro.ball, user)) {
                let collidePoint = ro.ball.y - (user.y + user.height / 2);
                collidePoint = collidePoint / (user.height / 2);
                let angleRad = (Math.PI / 4) * collidePoint;
                let direction = ro.ball.x < 600 / 2 ? 1 : -1;
                ro.ball.velocityX = direction * ro.ball.speed * Math.cos(angleRad);
                ro.ball.velocityY = ro.ball.speed * Math.sin(angleRad);
                if (ro.ball.speed + 0.5 > 15)
                    ro.ball.speed = 15;
                else
                    ro.ball.speed += 0.5;
            }
            if (ro.ball.x - ro.ball.radius <= 0) {
                this.gameService.resetBall(ro.ball);
                ro.player2.score++;
                this.server
                    .to(roomName)
                    .emit("updateScore", ro.player1.score, ro.player2.score);
                if (id === this.rooms.get(roomName)[0])
                    this.gameState(roomName, { player: id, score: ro.player1.score }, { player: this.rooms.get(roomName)[1], score: ro.player2.score });
                else
                    this.gameState(roomName, { player: this.rooms.get(roomName)[1], score: ro.player2.score }, { player: this.rooms.get(roomName)[0], score: ro.player1.score });
            }
            else if (ro.ball.x + ro.ball.radius >= 600) {
                this.gameService.resetBall(ro.ball);
                ro.player1.score++;
                this.server
                    .to(roomName)
                    .emit("updateScore", ro.player1.score, ro.player2.score);
                if (id === this.rooms.get(roomName)[0])
                    this.gameState(roomName, { player: id, score: ro.player1.score }, { player: this.rooms.get(roomName)[1], score: ro.player1.score });
                else
                    this.gameState(roomName, { player: this.rooms.get(roomName)[1], score: ro.player2.score }, { player: this.rooms.get(roomName)[0], score: ro.player1.score });
            }
            this.server.to(roomName).emit("updateTheBall", ro.ball);
        }, 25));
    }
    async gameState(roomName, p1, p2) {
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
            }
            else {
                //console.log(player1, player2);
                this.server.to(player1).emit("gameOver", "lose");
                this.server.to(player2).emit("gameOver", "win");
            }
            this.gameService.updateGameHistory(player1, player2, p1.score.toString(), p2.score.toString());
            this.stopEmittingBallPosition(roomName);
        }
    }
    async stopEmittingBallPosition(roomName) {
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
        delete this.rooms[roomName];
        delete this.roomState[roomName];
        delete this.ballPositionInterval[roomName];
        clearInterval(this.ballPositionInterval.get(roomName));
    }
    identifyClient(client, id) {
        if (this.clients.has(id)) {
            client.emit("alreadyExist");
        }
        else {
            this.clients.set(id, client);
            this.joindClients.set(id, 0);
            client.join(id);
        }
    }
    handleJoinRoom(client, id) {
        this.joindRoom++;
        if (this.clients.size === 2 && this.joindRoom > 1) {
            this.joindRoom = 0;
            const roomName = `room-${Date.now()}`;
            this.rooms.set(roomName, Array.from(this.clients.keys()));
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
            this.GameInit(roomName);
            this.gameService.resetBall(this.roomState.get(roomName).ball);
            this.startEmittingBallPosition(roomName, id);
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
                        this.roomState.get(data.room).player1.y = data.paddle;
                    else
                        this.roomState.get(data.room).player2.y = data.paddle;
                    this.server.to(otherClient).emit("resivePaddle", data.paddle);
                }
            }
        }
    }
    onOpponentLeft(client, data) {
        if (data.room) {
            const clientsRoom = this.rooms.get(data.room);
            if (clientsRoom) {
                const otherClient = clientsRoom.find((c) => c !== data.userId);
                const otherclientValue = this.clients.get(otherClient);
                if (otherClient) {
                    this.server.to(otherClient).emit("opponentLeft");
                }
            }
            client.leave(data.room);
            client.leave(data.userId);
            client.leave(data.userId);
            client.leave(data.room);
        }
        this.stopEmittingBallPosition(data.room);
    }
    onIvite(client, data) {
        this.inviteRoom.set(data.userId1, client);
        client.join(data.userId1);
        this.server.to(data.userId1).emit("invite", data);
        this.server.to(data.userId2).emit("invite", data);
    }
    onAccept(client, data) {
        this.inviteRoom.set(data.userId2, client);
        client.join(data.userId2);
        this.server.to(data.userId2).emit("accepted", data);
        const roomName = data.userId1 + data.userId2;
        const sockets = [
            this.inviteRoom.get(data.userId1),
            this.inviteRoom.get(data.userId2),
        ];
        this.rooms.set(roomName, [data.userId1, data.userId2]);
        sockets.forEach((socket) => {
            socket.join(roomName);
        });
        this.server.to(roomName).emit("startGame", data);
        this.GameInit(roomName);
        this.gameService.resetBall(this.roomState.get(roomName).ball);
        this.startEmittingBallPosition(roomName, data.userId2);
        this.clients.clear();
    }
    onDeclien(client, Id) {
        this.server.to(Id).emit("declien");
    }
    onOut(client, Id) {
        this.clients.delete(Id);
        this.joindClients.delete(Id);
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("createMessage"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "createMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updateData"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "updateData", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updateStatusGeust"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "updateStatusGeust", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updateChannel"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "updateChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("isTyping"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "isTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("kickedFromChannel"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "kickedFromChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("emitNewMessage"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "joinChannelEmit", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("blockUserToUser"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "blockUserToUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("mutedUserInChannel"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "mutedUserInChannel", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("changeStatusMember"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "changeStatusMember", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("messagsSeenEmit"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "messagsSeenEmit", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("clientId"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "identifyClient", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updatePaddle"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "onUpdatePaddle", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("opponentLeft"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "onOpponentLeft", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("invite"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "onIvite", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("accept"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "onAccept", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("decline"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "onDeclien", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("clear"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], SocketGateway.prototype, "onOut", null);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [socket_service_1.SocketGatewayService,
        messages_service_1.MessagesService,
        game_service_1.GameService,
        prisma_service_1.PrismaService])
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map