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
        }
    }
    findRoomByClient(client) {
        return Array.from(this.rooms.entries()).find(([roomName, roomClients]) => roomClients.includes(client))?.[0];
    }
    onUpdatePaddle(client, data) {
        const roomName = this.findRoomByClient(client);
        if (roomName) {
            const room = this.rooms.get(roomName);
        }
    }
    handleDisconnect(client) {
        const roomName = this.findRoomByClient(client);
        console.log("client Disconected");
        if (roomName) {
            if (this.rooms.has(roomName)) {
                const clientsInRoom = this.rooms.get(roomName);
                this.rooms.set(roomName, clientsInRoom.filter((c) => c !== client));
                if (this.rooms.get(roomName).length === 0) {
                    this.rooms.delete(roomName);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "identifyClient", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("updatePaddle"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "onUpdatePaddle", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('disconnecting'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MyGateway.prototype, "handleDisconnect", null);
exports.MyGateway = MyGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(4001, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    })
], MyGateway);
//# sourceMappingURL=testGetaway.js.map