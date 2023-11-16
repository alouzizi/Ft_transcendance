import { Padlle, Ball, canvasContext, Canvas } from "./interface";

export default function updateCanvas(
  canvasCtx: Canvas,
  ball: Ball,
  computer: Padlle,
  player: Padlle
) {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  if (ball.y + ball.radius > canvasCtx.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }
  let user = ball.x < canvasCtx.width / 2 ? player : computer;
  if (collision(ball, user)) {
    let collidePoint = ball.y - (user.y + user.height / 2);
    collidePoint = collidePoint / (user.height / 2);
    let angleRad = (collidePoint * Math.PI) / 4;
    let direction = ball.x < canvasCtx.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // evrytime the ball hit a paddle , encrese the speed
    if (ball.speed + 0.5 > 15) ball.speed = 15;
    else ball.speed += 0.5;
    // console.log(ball.speed);
  }
  if (ball.x - ball.radius <= 0) {
    resetBall(canvasCtx, ball);
    // the computer win
    computer.score++;
    // alert("Computer Win");
  } else if (ball.x + ball.radius >= canvasCtx.width) {
    resetBall(canvasCtx, ball);
    // alert("You Win");
    // the user win
    player.score++;
  }
}

export const resetBall = (canvasCtx: Canvas, ball: Ball) => {
  ball.x = canvasCtx.width / 2;
  ball.y = canvasCtx.height / 2;
  ball.speed = 5;
  ball.velocityX = 5;
  ball.velocityY = 5;
  ball.radius = 10;
};

export const collision = (b: any, p: any) => {
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  return (
    b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
  );
};

export function drawCanvas(
  ctx: any,
  canvas: any,
  canvasCtx: Canvas,
  ball: Ball,
  computer: Padlle,
  player: Padlle
) {
  // ctx?.clearRect(0, 0, canvasCtx.width, canvasCtx.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, canvasCtx.width, canvasCtx.height);
  drawRect(ctx, {
    x: 0,
    y: 0,
    width: canvasCtx.width,
    height: canvasCtx.height,
    color: "black",
    score: 0,
  });

  // Draw the net
  drawNet(ctx, canvas, canvasCtx);

  // Draw the ball
  drawCircle(ctx, ball);
  // Draw the user's paddle

  drawRect(ctx, player);
  drawRect(ctx, computer);

  // Draw the score
  drawText(ctx, canvasCtx.width / 4, canvasCtx.height / 5, player.score);
  drawText(
    ctx,
    (3 * canvasCtx.width) / 4,
    canvasCtx.height / 5,
    computer.score
  );
}

export function drawNet(ctx: any, ref: any, canvasCtx: Canvas) {
  for (let i = 0; i <= canvasCtx.height; i += 15) {
    drawRect(ctx, {
      x: canvasCtx.width / 2,
      y: i,
      width: 2,
      height: 10,
      color: "WHITE",
      score: 0,
    });
  }
}

export function drawRect(ctx: any, p: Padlle) {
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x, p.y, p.width, p.height);
}

export function drawCircle(ctx: any, b: Ball) {
  ctx.fillStyle = b.color;
  ctx.beginPath();
  ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

export function drawText(ctx: any, x: number, y: number, score: number) {
  ctx.fillStyle = "white";
  ctx.font = "50px fantasy";
  ctx.fillText(score, x, y);
}
