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
exports.FortyTwoIntranetStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_42_1 = require("passport-42");
const user_service_1 = require("../../user/user.service");
let FortyTwoIntranetStrategy = class FortyTwoIntranetStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, "42-intranet") {
    constructor(userService) {
        super({
            clientID: process.env.CLIENT_ID_42,
            clientSecret: process.env.CLIENT_SECRET_42,
            callbackURL: process.env.CALLBACK_URL_42,
            scope: ['public'],
        });
        this.userService = userService;
    }
    validateUser(profile) {
        const { id, first_name, last_name, image, login } = profile._json;
        const user = {
            intra_id: typeof id === "string" ? id : id.toString(),
            email: profile["emails"][0]["value"],
            first_name: first_name,
            last_name: last_name,
            profilePicture: image.link,
            login42: login,
        };
        return user;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const user = await this.validateUser(profile);
            let checkuser = await this.userService.findByIntraId(user.intra_id);
            if (checkuser) {
                done(null, checkuser);
            }
            else {
                let createnewuser = await this.userService.createUser(user);
                done(null, createnewuser);
            }
            return user;
        }
        catch (error) {
            done(error, false);
        }
    }
};
exports.FortyTwoIntranetStrategy = FortyTwoIntranetStrategy;
exports.FortyTwoIntranetStrategy = FortyTwoIntranetStrategy = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [user_service_1.UserService])
], FortyTwoIntranetStrategy);
//# sourceMappingURL=42-intranet.strategy.js.map