import { PaddleDto, BallDto } from "./dto/game.tdo";
export declare class PongServise {
    collision(ball: any, player: any): boolean;
    resetBall(ball: BallDto): void;
    startGame(ball: BallDto, player1: PaddleDto, player2: PaddleDto): void;
}
