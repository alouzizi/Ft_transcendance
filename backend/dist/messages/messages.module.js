"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
<<<<<<< HEAD
const messages_gateway_1 = require("./messages.gateway");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const messages_controller_1 = require("./messages.controller");
=======
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const messages_controller_1 = require("./messages.controller");
const channel_service_1 = require("../channel/channel.service");
>>>>>>> implement the sockets successfully
let MessagesModule = class MessagesModule {
};
exports.MessagesModule = MessagesModule;
exports.MessagesModule = MessagesModule = __decorate([
    (0, common_1.Module)({
        controllers: [messages_controller_1.MessageController],
<<<<<<< HEAD
        providers: [messages_gateway_1.MessagesGateway, prisma_service_1.PrismaService, user_service_1.UserService, messages_service_1.MessagesService],
=======
        providers: [prisma_service_1.PrismaService, user_service_1.UserService, messages_service_1.MessagesService, channel_service_1.ChannelService],
>>>>>>> implement the sockets successfully
        exports: [messages_service_1.MessagesService]
    })
], MessagesModule);
//# sourceMappingURL=messages.module.js.map