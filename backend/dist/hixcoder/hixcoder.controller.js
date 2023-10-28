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
exports.HixcoderController = void 0;
const common_1 = require("@nestjs/common");
const hixcoder_service_1 = require("./hixcoder.service");
let HixcoderController = class HixcoderController {
    constructor(hixcoderService) {
        this.hixcoderService = hixcoderService;
    }
    async getOnlineFriends() {
        try {
            const onlineFriends = await this.hixcoderService.getOnlineFriends();
            return {
                data: onlineFriends,
            };
        }
        catch (error) {
            return {
                error: "An error occurred while fetching online friends.",
            };
        }
    }
};
exports.HixcoderController = HixcoderController;
__decorate([
    (0, common_1.Get)("onlineFriends"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HixcoderController.prototype, "getOnlineFriends", null);
exports.HixcoderController = HixcoderController = __decorate([
    (0, common_1.Controller)("hixcoder"),
    __metadata("design:paramtypes", [hixcoder_service_1.HixcoderService])
], HixcoderController);
//# sourceMappingURL=hixcoder.controller.js.map