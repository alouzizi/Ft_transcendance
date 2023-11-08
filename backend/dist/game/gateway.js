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
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let MyGateway = class MyGateway {
    constructor() {
        this.clients = new Map();
        this.rooms = [];
    }
    onModuleInit() {
    }
    handleDisconnect(client) {
        console.log("client is Disconnected <>");
    }
    handleConnection(client) {
        console.log("client is connected <>");
    }
    updatePaddle(data) {
        console.log("updatePaddle");
        this.server.emit("updatePaddle", data);
    }
    identifyClient(client, id) {
        console.log({ id: id, sockId: client.id });
        if (!this.clients.has(id)) {
            this.clients.set(id, client);
        }
        else {
            client.emit("alreadyExist");
            console.log("alreadyExist");
        }
        if (this.clients.size === 2) {
            console.log("2 clients");
            const roomName = `room-${Date.now()}`;
            this.rooms.push(roomName);
            const clientsArray = Array.from(this.clients.values()).slice(0, 2);
            clientsArray.forEach((client) => {
                console.log({ SocketId: client.id, roomName: roomName });
                client.join(roomName);
                client.emit("startGame");
            });
            this.server.to(roomName).emit("startGame");
            this.clients.clear();
        }
    }
};
exports.MyGateway = MyGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MyGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("updatePaddle"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "updatePaddle", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("clientId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "identifyClient", null);
exports.MyGateway = MyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(4001, {
        cors: {
            origin: '*',
        },
    })
], MyGateway);
//# sourceMappingURL=gateway.js.map