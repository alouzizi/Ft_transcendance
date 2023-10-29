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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ChannelService = class ChannelService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createChannel(createChannelDto, senderId) {
        try {
            const newChannel = await this.prisma.channel.create({
                data: {
                    channelOwnerId: senderId,
                    channelName: createChannelDto.channleName,
                    channelPassword: createChannelDto.channlePassword,
                    channelType: createChannelDto.channelType
                }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return { status: 202, error: 'Name is already used' };
                }
                else {
                    console.error('Prisma error:', error);
                }
            }
        }
        return 'This action adds a new channel';
    }
    findAll() {
        return `This action returns all channel`;
    }
    findOne(id) {
        return `This action returns a #${id} channel`;
    }
    update(id, updateChannelDto) {
        return `This action updates a #${id} channel`;
    }
    remove(id) {
        return `This action removes a #${id} channel`;
    }
};
exports.ChannelService = ChannelService;
exports.ChannelService = ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChannelService);
//# sourceMappingURL=channel.service.js.map