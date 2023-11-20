import { useEffect, useRef } from "react";
import { Ball, Padlle, useCanvas } from "./interface";
import updateCanvas, { drawCanvas, resetBall } from "./pongUtils";

const Pong = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useCanvas();
  let animationFrameId: number;
  let animationFrameId1: number;
  const player: Padlle = {
    x: 10,
    y: 0,
    width: 10,
    height: 100,
    color: "white",
    score: 0,
  };

  const computer: Padlle = {
    x: canvasCtx.width - 15,
    y: canvasCtx.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "white",
    score: 0,
  };

  const ball: Ball = {
    x: 0,
    y: 0,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const handleMouseMove = (e: any) => {
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top - player.height / 2;
      player.y = Math.min(Math.max(mouseY, 0), canvas.height - player.height);
    };
    resetBall(canvasCtx, ball);
    function update() {
      let computerLevel = 1;
      let desiredComputerY = ball.y - computer.height / 2;
      desiredComputerY = Math.min(
        Math.max(desiredComputerY, 0),
        canvasCtx.height - computer.height
      );
      computer.y += (desiredComputerY - computer.y) * computerLevel;
      updateCanvas(canvasCtx, ball, computer, player);
      drawCanvas(ctx, canvas, canvasCtx, ball, computer, player,2);
      animationFrameId1 = window.requestAnimationFrame(update);
    }
    animationFrameId = window.requestAnimationFrame(update);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(animationFrameId1);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={canvasCtx.width}
      height={canvasCtx.height}
      className="border border-black rounded-md"
    />
  );
};

export default Pong;
