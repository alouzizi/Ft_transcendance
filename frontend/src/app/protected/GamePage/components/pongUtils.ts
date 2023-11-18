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
  player: Padlle,
  canvasMap :number,
) {




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

  // const gradient = ctx.createLinearGradient(
  //   0,
  //   0,
  //   canvasCtx.width,
  //   canvasCtx.height
  // );
  // gradient.addColorStop(0, "#232323"); // Dark color
  // gradient.addColorStop(1, "#4d4d4d"); // Light color
  // ctx.fillStyle = gradient;
  // ctx.fillRect(0, 0, canvasCtx.width, canvasCtx.height);









if (canvasMap === 1) {
  const backgroundColor = "#1a1a1a";
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvasCtx.width, canvasCtx.height);
  
  // Draw a subtle grid pattern for added visual interest
  ctx.strokeStyle = "#444";
  ctx.lineWidth = 1;
  
  for (let i = 0; i < canvasCtx.width; i += 15) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvasCtx.height);
    ctx.stroke();
  }
  
  for (let i = 0; i < canvasCtx.height; i += 15) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvasCtx.width, i);
    ctx.stroke();
  }
  
  // Redraw the net with a more subtle style
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 2;
  
  for (let i = 0; i <= canvasCtx.height; i += 20) {
    ctx.beginPath();
    ctx.moveTo(canvasCtx.width / 2, i);
    ctx.lineTo(canvasCtx.width / 2, i + 10);
    ctx.stroke();
  }

  drawCircle1(ctx, ball);
  drawRect1(ctx, player);
  drawRect1(ctx, computer);


}



else if (canvasMap === 2) {

// Set a gradient background for a more dynamic look
const gradient = ctx.createLinearGradient(0, 0, canvasCtx.width, canvasCtx.height);
gradient.addColorStop(0, "#2c3e50"); // Dark blue
gradient.addColorStop(1, "#34495e"); // Dark gray-blue
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvasCtx.width, canvasCtx.height);

// Redraw the net with a stylish pattern
ctx.strokeStyle = "#ecf0f1"; // Light gray
ctx.lineWidth = 2;

for (let i = 0; i <= canvasCtx.height; i += 25) {
  ctx.beginPath();
  ctx.moveTo(canvasCtx.width / 2, i);
  ctx.lineTo(canvasCtx.width / 2, i + 15);
  ctx.stroke();
}


drawCircle2(ctx, ball);
drawRect2(ctx, player);
drawRect2(ctx, computer);
}







// else if (canvasMap === 3) {



//   drawCircle3(ctx, ball);
// drawRect3(ctx, player);
// drawRect3(ctx, computer);
// }










  // Draw the ball
  // drawCircle(ctx, ball);
  // // Draw the user's paddle

  // drawRect(ctx, player);
  // drawRect(ctx, computer);

  // // Draw the score
  // drawText(ctx, canvasCtx.width / 4, canvasCtx.height / 5, player.score);
  // drawText(
  //   ctx,
  //   (3 * canvasCtx.width) / 4,
  //   canvasCtx.height / 5,
  //   computer.score
  // );

}

export function drawNet(ctx: any, ref: any, canvasCtx: Canvas) {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";

  for (let i = 0; i <= canvasCtx.height; i += 15) {
    ctx.beginPath();
    ctx.moveTo(canvasCtx.width / 2, i);
    ctx.lineTo(canvasCtx.width / 2, i + 10);
    ctx.stroke();
  }
}


export function drawRect1(ctx: any, p: Padlle) {
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x, p.y, p.width, p.height);
}


export function drawCircle1(ctx: any, b: Ball) {
  ctx.fillStyle = b.color;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}


export function drawText1(ctx: any, x: number, y: number, score: number) {
  ctx.fillStyle = "white";
  ctx.font = "bold 30px sans-serif"; // Adjusted font style and size
  ctx.textAlign = "center";
  ctx.fillText(score, x, y);
}




export function drawRect2(ctx: any, p: Padlle) {
  ctx.fillStyle = p.color;
  ctx.shadowColor = "#999";
  ctx.shadowBlur = 5;
  ctx.fillRect(p.x, p.y, p.width, p.height);
  ctx.shadowBlur = 0; // Reset shadow after drawing
}

// export function drawCircle2(ctx: any, b: Ball) {
//   ctx.fillStyle = b.color;
//   ctx.shadowColor = "#999";
//   ctx.shadowBlur = 5;
//   ctx.beginPath();
//   ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.closePath();
//   ctx.shadowBlur = 0; // Reset shadow after drawing
// }

// Improve text rendering with a more modern font and color
export function drawText2(ctx: any, x: number, y: number, score: number) {
  ctx.fillStyle = "#ccc";
  ctx.font = "bold 40px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(score, x, y);
}





// Enhance the paddle and ball with a smoother style
export function drawRect(ctx: any, p: Padlle) {
  ctx.fillStyle = p.color;
  ctx.shadowColor = "#95a5a6"; // Light gray
  ctx.shadowBlur = 10;
  ctx.fillRect(p.x, p.y, p.width, p.height);
  ctx.shadowBlur = 0; // Reset shadow after drawing
}

// export function drawCircle(ctx: any, b: Ball) {
//   ctx.fillStyle = b.color;
//   ctx.shadowColor = "#95a5a6"; // Light gray
//   ctx.shadowBlur = 10;
//   ctx.beginPath();
//   ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.closePath();
//   ctx.shadowBlur = 0; // Reset shadow after drawing
// }

// Improve text rendering with a more vibrant color and font
export function drawText(ctx: any, x: number, y: number, score: number) {
  ctx.fillStyle = "#e74c3c"; // Red
  ctx.font = "bold 50px 'Arial', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(score, x, y);
}

// const ballTrail: any[] = [];

export function drawCircle2(ctx: any, b: Ball) {
  // Add the current ball position to the trail
  ballTrail.push({ x: b.x, y: b.y });

  // Keep only the last 10 positions in the trail
  if (ballTrail.length > 10) {
    ballTrail.shift();
  }

  // Draw the main ball
  ctx.fillStyle = "#ffff00"; // Orange color
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  // Draw a longer fire trail at the end of the ball
  const trailLength = 20; // Adjust the length of the trail
  for (let i = ballTrail.length - trailLength; i < ballTrail.length; i++) {
    if (i >= 0) {
      const trailPosition = ballTrail[i];
      const trailRadius = b.radius * 1.5; // Adjust the radius of the trail

      // Use a gradient of fire colors
      const gradient = ctx.createRadialGradient(
        trailPosition.x,
        trailPosition.y,
        0,
        trailPosition.x,
        trailPosition.y,
        trailRadius
      );
      gradient.addColorStop(0, "rgba(255, 255, 0, 1)");
      gradient.addColorStop(1, "rgba(255, 165, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(trailPosition.x, trailPosition.y, trailRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }
}


const ballTrail: any[] = [];

export function drawCircle3(ctx: any, b: Ball) {
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
export function animateBall(ball: Ball, canvasCtx: Canvas, speedX: number, speedY: number) {
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
