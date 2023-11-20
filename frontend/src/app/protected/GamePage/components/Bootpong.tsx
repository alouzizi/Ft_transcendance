import { useEffect, useRef } from "react";
import { Ball, Padlle, useCanvas } from "./interface";
import updateCanvas, { drawCanvas, drawText, resetBall } from "./pongUtils";
import {useRouter } from "next/navigation";

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
  const router = useRouter();
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
      // const mouseY = e.clientY - rect.top - player.height / 2;
      // player.y = Math.min(Math.max(mouseY, 0), (canvas.height + 10) - player.height);
      // player.y = e.clientY - rect.top - player.height / 2;
      player.y = e.clientY - rect.top - player.height/2;
    };
    resetBall(canvasCtx, ball);
    function update() {
      
      let computerLevel = 0.5;
      // let desiredComputerY = ball.y - (computer.height) / 2;
      // desiredComputerY = Math.min(
      //   Math.max(desiredComputerY, 0),
      //   (  10 +canvasCtx.height) - computer.height
      // );
      // computer.y += (desiredComputerY - computer.y) * computerLevel;
      computer.y += (ball.y - (computer.y + computer.height/2)) * computerLevel;
      updateCanvas(canvasCtx, ball, computer, player);
      drawCanvas(ctx, canvas, canvasCtx, ball, computer, player,3);
      if(player.score  + computer.score === 6){
        setInterval(() => {
        if(player.score > computer.score){
          drawText(ctx, "You win!", canvasCtx.width / 2, canvasCtx.height / 2);
      }
      if(player.score < computer.score){
        drawText(ctx, "You lose!", canvasCtx.width / 2, canvasCtx.height / 2);
      }
      if( player.score === computer.score){
        drawText(ctx, "You draw!", canvasCtx.width / 2, canvasCtx.height / 2);
      }
    },20);
      setTimeout(() => {
        router.push('/protected/GamePage');
      }, 2500);
    }else{
      animationFrameId1 = window.requestAnimationFrame(update);

    }
    window.addEventListener("mousemove", handleMouseMove);

    
  }
  animationFrameId = window.requestAnimationFrame(update);
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
