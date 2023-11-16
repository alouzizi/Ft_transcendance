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
exports.GoogleStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const user_service_1 = require("../user/user.service");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(userService) {
        super({
            clientID: '571358523842-ut46roabf8j6r0k8ajjgleu1o4ditdru.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:4000/auth/google/callback',
            scope: ['profile', 'email'],
        });
        this.userService = userService;
    }
    validateUser(profile) {
        const user = {
            intra_id: profile._json.sub,
            email: profile._json.email,
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            profilePicture: profile._json.picture,
            login42: profile._json.given_name,
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
                console.log("here");
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
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [user_service_1.UserService])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map