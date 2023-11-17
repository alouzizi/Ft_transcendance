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
let SocketGateway = class SocketGateway {
    constructor(socketGatewayService, messagesService) {
        this.socketGatewayService = socketGatewayService;
        this.messagesService = messagesService;
    }
    afterInit(server) {
        console.log('Gateway Initialized');
    }
    async handleConnection(client) {
        this.socketGatewayService.handleConnection(client, this.wss);
    }
    async handleDisconnect(client) {
        this.socketGatewayService.handleDisconnect(client, this.wss);
    }
    async createMessage(createMessageDto) {
        await this.messagesService.createMessage(this.wss, createMessageDto);
    }
    async updateData(ids) {
        this.socketGatewayService.updateData(ids, this.wss);
    }
    async isTyping(ids) {
        this.wss.to(ids.receivedId).emit('isTyping', ids);
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "createMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "updateData", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('isTyping'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], SocketGateway.prototype, "isTyping", null);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [socket_service_1.SocketGatewayService,
        messages_service_1.MessagesService])
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map