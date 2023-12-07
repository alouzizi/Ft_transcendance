"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./user/user.module");
const messages_module_1 = require("./messages/messages.module");
const friendship_module_1 = require("./friendship/friendship.module");
const channel_module_1 = require("./channel/channel.module");
const socket_module_1 = require("./socket/socket.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const game_module_1 = require("./game/game.module");
const notification_module_1 = require("./notification/notification.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            user_module_1.UserModule,
            messages_module_1.MessagesModule,
            friendship_module_1.FriendshipModule,
            channel_module_1.ChannelModule,
            socket_module_1.SocketGatewayModule,
            game_module_1.GameModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "..", "uploads"),
                serveRoot: "/uploads",
            }),
            notification_module_1.NotificationModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map