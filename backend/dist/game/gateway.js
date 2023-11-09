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
        this.rooms = new Map();
    }
    onModuleInit() { }
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
    handleJoinRoom(client, id) {
        console.log({ size: this.clients.size });
        if (this.clients.size === 2) {
            console.log("2 clients connected");
            const clientArray = Array.from(this.clients.keys());
            clientArray.forEach((client) => {
                console.log({ client: client });
                this.server.to(client).emit("startGame");
            });
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
exports.MyGateway = MyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(4001, {
        cors: {
            origin: "http://localhost:3000",
        },
    })
], MyGateway);
//# sourceMappingURL=gateway.js.map