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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let NotificationService = class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNotification(createNotificationDto) {
        const notification = await this.prisma.notificationTable.create({
            data: {
                senderId: createNotificationDto.senderId,
                recieverId: createNotificationDto.recieverId,
                subjet: createNotificationDto.subject,
            },
        });
        return 'Notification created succesfully';
    }
    async deleteNotification(notificationId) {
        const notification = await this.prisma.notificationTable.findUnique({
            where: { id: notificationId },
        });
        if (!notification) {
            throw new common_2.NotFoundException("There is no notification with the given ID");
        }
        await this.prisma.notificationTable.delete({
            where: { id: notificationId },
        });
        return;
    }
    async clearAll(senderId) {
        await this.prisma.notificationTable.deleteMany({
            where: {
                recieverId: senderId
            }
        });
    }
    async fetchNotifications(senderId) {
        const notifications = await this.prisma.notificationTable.findMany({
            where: {
                recieverId: senderId,
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        return notifications;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map