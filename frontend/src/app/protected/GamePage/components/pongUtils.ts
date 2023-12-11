import { ca } from "date-fns/locale";
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
    let angleRad = (Math.PI / 4) * collidePoint;
    let direction = ball.x < canvasCtx.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // evrytime the ball hit a paddle , encrese the speed
    if (ball.speed + 0.5 > 15) ball.speed = 15;
    else ball.speed += 0.5;
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
  player: Padlle,
  canvasMap: number
) {
  if (canvasMap === 1)
    animation1(ctx, canvas, canvasCtx, ball, computer, player, canvasMap);
  else if (canvasMap === 2)
    animation2(ctx, canvas, canvasCtx, ball, computer, player, canvasMap);
  else if (canvasMap === 3)
    animation3(ctx, canvas, canvasCtx, ball, computer, player, canvasMap);
}

export function animation1(
  ctx: any,
  canvas: any,
  canvasCtx: Canvas,
  ball: Ball,
  computer: Padlle,
  player: Padlle,
  canvasMap: number
) {
  // ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillStyle = "BLACK";
  ctx.fillRect(0, 0, canvasCtx.width, canvasCtx.height);
  drawNet(ctx, canvas, canvasCtx);
  drawCircleAnimation4(ctx, ball);
  drawRectAnimation1(ctx, player);
  drawRectAnimation1(ctx, computer);

  drawTextAnimation1(
    ctx,
    canvasCtx.width / 4,
    canvasCtx.height / 6,
    player.score
  );
  drawTextAnimation1(
    ctx,
    (3 * canvasCtx.width) / 4,
    canvasCtx.height / 6,
    computer.score
  );
}

export function drawRectAnimation1(ctx: any, p: Padlle) {
  ctx.fillStyle = p.color;
  ctx.shadowColor = "#999";
  ctx.shadowBlur = 5;
  ctx.fillRect(p.x, p.y, p.width, p.height);
  ctx.shadowBlur = 0; // Reset shadow after drawing
}

export function drawCircleAnimation1(ctx: any, b: Ball) {
  ctx.fillStyle = b.color;
  ctx.shadowColor = "#999";
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.shadowBlur = 0; // Reset shadow after drawing
}

// Improve text rendering with a more modern font and color
export function drawTextAnimation1(
  ctx: any,
  x: number,
  y: number,
  score: number
) {
  ctx.fillStyle = "#ccc";
  ctx.font = "bold 40px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(score, x, y);
}

export function drawNet(ctx: any, ref: any, canvasCtx: Canvas) {
  for (let i = 0; i <= canvasCtx.height; i += 15) {
    drawRectAnimation1(ctx, {
      x: canvasCtx.width / 2,
      y: i,
      width: 2,
      height: 10,
      color: "WHITE",
      score: 0,
    });
  }
}

// animation 2

export function animation2(
  ctx: any,
  canvas: any,
  canvasCtx: Canvas,
  ball: Ball,
  computer: Padlle,
  player: Padlle,
  canvasMap: number
) {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvasCtx.height);
  gradient.addColorStop(0, "#1e272e"); // Dark blue-gray
  gradient.addColorStop(1, "#192a35"); // Dark navy
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasCtx.width, canvasCtx.height);

  // Draw a subtle grid pattern for added visual interest
  ctx.strokeStyle = "#2c3e50"; // Dark gray-blue
  ctx.lineWidth = 1;

  for (let i = 0; i < canvasCtx.width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvasCtx.height);
    ctx.stroke();
  }

  for (let i = 0; i < canvasCtx.height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvasCtx.width, i);
    ctx.stroke();
  }

  // Redraw the net with a subtle style and animation
  ctx.strokeStyle = "#34495e"; // Dark gray-blue
  ctx.lineWidth = 2;

  for (let i = 0; i <= canvasCtx.height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(canvasCtx.width / 2, i);
    ctx.lineTo(canvasCtx.width / 2, i + 10 + Math.sin(Date.now() / 200) * 5); // Add a subtle animation to the net
    ctx.stroke();
  }
  drawCircleAnimation2(ctx, ball);
  drawRectAnimation2(ctx, player);
  drawRectAnimation2(ctx, computer);

  drawTextAnimation2(
    ctx,
    canvasCtx.width / 4,
    canvasCtx.height / 6,
    player.score
  );
  drawTextAnimation2(
    ctx,
    (3 * canvasCtx.width) / 4,
    canvasCtx.height / 6,
    computer.score
  );
}

export function drawRectAnimation2(ctx: any, p: Padlle) {
  ctx.fillStyle = "#3498db"; // Dodger blue
  ctx.shadowColor = "#2980b9"; // Darker dodger blue
  ctx.shadowBlur = 10;
  ctx.fillRect(p.x, p.y, p.width, p.height);
  ctx.shadowBlur = 0; // Reset shadow after drawing
}

export function drawCircleAnimation2(ctx: any, b: Ball) {
  // Add a subtle pulsating effect to the ball
  const pulsatingFactor = Math.sin(Date.now() / 300) * 5;
  const radius = b.radius + pulsatingFactor;

  ctx.fillStyle = b.color;
  ctx.shadowColor = "#333";
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.shadowBlur = 0; // Reset shadow after drawing
}

// Improve text rendering with a clean and modern style
export function drawTextAnimation2(
  ctx: any,
  x: number,
  y: number,
  score: number
) {
  const bounceAmount = Math.sin(Date.now() / 200) * 5; // Add a subtle bouncing animation
  ctx.fillStyle = "#bdc3c7"; // Silver
  ctx.font = "bold 40px 'Raleway', sans-serif"; // Use the Raleway font or replace it with your preferred font
  ctx.textAlign = "center";
  ctx.fillText(score, x, y + bounceAmount);
}

// animation 3

export function animation3(
  ctx: any,
  canvas: any,
  canvasCtx: Canvas,
  ball: Ball,
  computer: Padlle,
  player: Padlle,
  canvasMap: number
) {
  ctx.fillStyle = "#2c3e50";
  ctx.fillRect(0, 0, canvasCtx.width, canvasCtx.height);

  // Draw a subtle grid pattern for added visual interest
  ctx.strokeStyle = "#34495e";
  ctx.lineWidth = 1;

  for (let i = 0; i < canvasCtx.width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvasCtx.height);
    ctx.stroke();
  }

  for (let i = 0; i < canvasCtx.height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvasCtx.width, i);
    ctx.stroke();
  }

  // Redraw the net with a minimalistic style and animation
  ctx.strokeStyle = "#ecf0f1";
  ctx.lineWidth = 2;
  for (let i = 0; i <= canvasCtx.height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(canvasCtx.width / 2, i);
    ctx.lineTo(canvasCtx.width / 2, i + 10 + Math.sin(Date.now() / 200) * 5); // Add a subtle animation to the net
    ctx.stroke();
  }
  drawCircleAnimation4(ctx, ball);
  drawRectAnimation3(ctx, player);
  drawRectAnimation3(ctx, computer);

  drawTextAnimation3(
    ctx,
    canvasCtx.width / 4,
    canvasCtx.height / 6,
    player.score
  );
  drawTextAnimation3(
    ctx,
    (3 * canvasCtx.width) / 4,
    canvasCtx.height / 6,
    computer.score
  );
}

export function drawRectAnimation3(ctx: any, p: Padlle) {
  ctx.fillStyle = "#ecf0f1";
  ctx.shadowColor = "#bdc3c7";
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.rect(p.x, p.y, p.width, p.height);
  ctx.fill();
  ctx.shadowBlur = 0;
}

// Improve text rendering with a clean and modern style and animation

export function drawTextAnimation3(
  ctx: any,
  x: number,
  y: number,
  score: number
) {
  ctx.fillStyle = "#ecf0f1";
  ctx.font = "bold 40px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(score, x, y);
}

export function drawCircleAnimation3(ctx: any, b: Ball) {
  b.x += b.speed;
  b.y += b.speed;

  ctx.fillStyle = "#e74c3c";
  ctx.shadowColor = "#c0392b";
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
  ctx.shadowBlur = 0; // Reset shadow after drawing
}

const ballTrail: any[] = [];

export function drawCircleAnimation4(ctx: any, b: Ball) {
  // Add the current ball position to the trail
  ballTrail.push({ x: b.x, y: b.y });

  // Keep only the last 20 positions in the trail
  if (ballTrail.length > 20) {
    ballTrail.shift();
  }

  // Draw a dynamic fire trail behind the ball
  for (let i = 0; i < ballTrail.length; i++) {
    const trailPosition = ballTrail[i];
    const trailRadius = b.radius * (i + 1) * 0.2;
    const alpha = 0.2 + i * 0.1;

    // Use a gradient of fire colors
    const gradient = ctx.createRadialGradient(
      trailPosition.x,
      trailPosition.y,
      0,
      trailPosition.x,
      trailPosition.y,
      trailRadius
    );
    gradient.addColorStop(0, `rgba(255, 165, 0, ${alpha})`); // Orange
    gradient.addColorStop(1, "rgba(255, 69, 0, 0)"); // Dark orange

    ctx.fillStyle = gradient;
    ctx.beginPath();
    if (trailPosition.x > ctx.width) {
      trailPosition.x = ctx.width - 10;
    } else if (trailPosition.x < 0) {
      trailPosition.x = ctx.height + 10;
    }
    ctx.arc(trailPosition.x, trailPosition.y, trailRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  // Draw the main ball
  ctx.fillStyle = "#ff4500"; // Orange color
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

// Add animation for the ball
export function animateBall(
  ball: Ball,
  canvasCtx: Canvas,
  speedX: number,
  speedY: number
) {
  ball.x += speedX;
  ball.y += speedY;

  // Bounce off the walls
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvasCtx.width) {
    speedX = -speedX;
  }
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvasCtx.height) {
    speedY = -speedY;
  }

  return { speedX, speedY };
}

export function drawText(ctx: any, text: string, x: number, y: number) {
  // Draw animated background
  drawAnimatedBackground(ctx);

  // Draw text
  const bounceAmount = Math.sin(Date.now() / 200) * 5;
  ctx.fillStyle = "#fff";
  ctx.font = "bold 40px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(text, x, y + bounceAmount);
}

function drawAnimatedBackground(ctx: any) {
  // Clear the canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Particle configuration
  const particleCount = 100;
  const particleRadius = 2;

  // Draw particles
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * ctx.canvas.width;
    const y = Math.random() * ctx.canvas.height;
    let speedX = (Math.random() - 0.5) * 2; // Random horizontal speed
    let speedY = (Math.random() - 0.5) * 2; // Random vertical speed

    // Draw particle
    ctx.beginPath();
    ctx.arc(x, y, particleRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();

    // Update particle position
    if (x + speedX > ctx.canvas.width || x + speedX < 0) {
      speedX *= -1; // Reverse horizontal speed if hitting the canvas edge
    }
    if (y + speedY > ctx.canvas.height || y + speedY < 0) {
      speedY *= -1; // Reverse vertical speed if hitting the canvas edge
    }

    // Move particle
    ctx.closePath();
  }
}
