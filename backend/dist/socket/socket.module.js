"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGatewayModule = void 0;
const common_1 = require("@nestjs/common");
const socket_gateway_1 = require("./socket.gateway");
const socket_service_1 = require("./socket.service");
const messages_service_1 = require("../messages/messages.service");
const user_service_1 = require("../user/user.service");
const channel_service_1 = require("../channel/channel.service");
const game_service_1 = require("../game/game.service");
const prisma_service_1 = require("../prisma/prisma.service");
const friendship_service_1 = require("../friendship/friendship.service");
const notification_service_1 = require("../notification/notification.service");
let SocketGatewayModule = class SocketGatewayModule {
};
exports.SocketGatewayModule = SocketGatewayModule;
exports.SocketGatewayModule = SocketGatewayModule = __decorate([
    (0, common_1.Module)({
        providers: [
            socket_gateway_1.SocketGateway,
            socket_service_1.SocketGatewayService,
            messages_service_1.MessagesService,
            user_service_1.UserService,
            channel_service_1.ChannelService,
            game_service_1.GameService,
            friendship_service_1.FriendshipService,
            prisma_service_1.PrismaService,
            notification_service_1.NotificationService
        ],
    })
], SocketGatewayModule);
//# sourceMappingURL=socket.module.js.map