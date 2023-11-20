
export class PaddleDto {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	score: number;
  }
  
  export class BallDto {
	x: number;
	y: number;
	radius: number;
	speed: number;
	velocityX: number;
	velocityY: number;
	color: string;
  }
  
  export class GameStateDto {
	player: PaddleDto;
	computer: PaddleDto;
	ball: BallDto;
  }
  