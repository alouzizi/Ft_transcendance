"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PongServise = void 0;
const common_1 = require("@nestjs/common");
let PongServise = class PongServise {
    collision(ball, player) {
        ball.top = ball.y - ball.radius;
        ball.bottom = ball.y + ball.radius;
        ball.left = ball.x - ball.radius;
        ball.right = ball.x + ball.radius;
        player.top = player.y;
        player.bottom = player.y + player.height;
        player.left = player.x;
        player.right = player.x + player.width;
        return (ball.right > player.left &&
            ball.bottom > player.top &&
            ball.left < player.right &&
            ball.top < player.bottom);
    }
    resetBall(ball) {
        ball.x = 600 / 2;
        ball.y = 400 / 2;
        ball.speed = 5;
        ball.velocityX = 5;
        ball.velocityY = 5;
        ball.radius = 10;
    }
    startGame(ball, player1, player2) {
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
        if (ball.y + ball.radius > 400 || ball.y - ball.radius < 0) {
            ball.velocityY = -ball.velocityY;
        }
        let user = ball.x < 600 / 2 ? player1 : player2;
        if (this.collision(ball, user)) {
            let collidePoint = ball.y - (user.y + user.height / 2);
            collidePoint = collidePoint / (user.height / 2);
            let angleRad = (collidePoint * Math.PI) / 4;
            let direction = ball.x < 600 / 2 ? 1 : -1;
            ball.velocityX = direction * ball.speed * Math.cos(angleRad);
            ball.velocityY = ball.speed * Math.sin(angleRad);
            if (ball.speed + 0.5 > 15)
                ball.speed = 15;
            else
                ball.speed += 0.5;
        }
        if (ball.x - ball.radius <= 0) {
            this.resetBall(ball);
            player2.score++;
        }
        else if (ball.x + ball.radius >= 600) {
            this.resetBall(ball);
            player1.score++;
        }
    }
};
exports.PongServise = PongServise;
exports.PongServise = PongServise = __decorate([
    (0, common_1.Injectable)()
], PongServise);
//# sourceMappingURL=game.service.js.map