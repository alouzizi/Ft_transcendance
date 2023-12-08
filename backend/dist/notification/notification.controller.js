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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const common_2 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    createNotification(createNotificationDto) {
        return this.notificationService.createNotification(createNotificationDto);
    }
    async deleteNotification(notificationId) {
        try {
            await this.notificationService.deleteNotification(notificationId);
            return { statusCode: 200, message: "Notification successfully deleted" };
        }
        catch (error) {
            if (error instanceof common_2.NotFoundException) {
                return { statusCode: 404, message: error.message };
            }
            else {
                console.error(error);
                return { statusCode: 500, message: "Internal server error" };
            }
        }
    }
    async fetchNotifications(senderId) {
        const notifications = await this.notificationService.fetchNotifications(senderId);
        return notifications;
    }
    async clearAll(senderId) {
        const notifications = await this.notificationService.clearAll(senderId);
        return notifications;
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)('/createNotification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "createNotification", null);
__decorate([
    (0, common_1.Delete)('/deletenotifications/:notificationId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('notificationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "deleteNotification", null);
__decorate([
    (0, common_1.Get)('/getNotifications/:senderId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "fetchNotifications", null);
__decorate([
    (0, common_1.Delete)('/clearAll/:senderId'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('senderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "clearAll", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map