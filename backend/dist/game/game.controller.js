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
exports.GameController = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
const common_2 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
let GameController = class GameController {
    constructor(gameService) {
        this.gameService = gameService;
    }
    async getGameHistory(sender) {
        return this.gameService.getGameHistory(sender);
    }
    async getGlobalInfos(recieverId) {
        return this.gameService.getGlobalInfos(recieverId);
    }
    async getUserRanking(recieverId) {
        return this.gameService.getUserRanking(recieverId);
    }
    async getLeaderBoard() {
        return this.gameService.getLeaderBoard();
    }
    async updateLevel(sender, newLevel) {
        return this.gameService.updateLevel(sender, newLevel);
    }
    async updateGameHistory(senderId, recieverId, senderPt, recieverPt) {
        return this.gameService.updateGameHistory(senderId, recieverId, senderPt, recieverPt);
    }
};
exports.GameController = GameController;
__decorate([
    (0, common_1.Get)("/gameHistory/:senderId"),
    (0, common_2.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("senderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGameHistory", null);
__decorate([
    (0, common_1.Get)("/globalInfos/:recieverId"),
    (0, common_2.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("recieverId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGlobalInfos", null);
__decorate([
    (0, common_1.Get)("/userRanking/:senderId"),
    (0, common_2.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("senderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getUserRanking", null);
__decorate([
    (0, common_1.Get)("/LeaderBoard/"),
    (0, common_2.UseGuards)(guard_1.JwtGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getLeaderBoard", null);
__decorate([
    (0, common_1.Post)("/updateLevel/:senderId/:newLevel"),
    (0, common_2.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("senderId")),
    __param(1, (0, common_1.Param)("newLevel")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateLevel", null);
__decorate([
    (0, common_1.Post)("/updateGameHistory/:senderId/:recieverId/:senderPt/:recieverPt"),
    (0, common_2.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)("senderId")),
    __param(1, (0, common_1.Param)("recieverId")),
    __param(2, (0, common_1.Param)("senderPt")),
    __param(3, (0, common_1.Param)("recieverPt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGameHistory", null);
exports.GameController = GameController = __decorate([
    (0, common_1.Controller)("game"),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
//# sourceMappingURL=game.controller.js.map