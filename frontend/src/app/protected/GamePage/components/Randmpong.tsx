import { useContext, useEffect, useRef, useState } from "react";
import { Ball, Padlle, useCanvas } from "./interface";
import { drawCanvas, drawRectAnimation2, drawText, drawTextAnimation2, resetBall } from "./pongUtils";
import { useGlobalContext } from "../../context/store";
import Alert from '@mui/joy/Alert';
import { useRouter } from "next/navigation";

// import { dividerClasses } from "@mui/material";


interface PongProps {
  room: string;
  isLeft: boolean;
  difficulty: number;
}

const Pong = ({ room, isLeft, difficulty }: PongProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useCanvas();
  const { user, socket } = useGlobalContext();
  let animationFrameId: number;
  let animationFrameId1: number;
  const router = useRouter();

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
    color: "#05EDFF",
  };

  const [width, setWidth] = useState<number>(window.innerWidth);

  let ratio = 1;

  if (canvasCtx.width < 600) {
    ratio = (canvasCtx.width) / 600;
  }

  useEffect(() => {

    if (!socket) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const handleMouseMove = (e: any) => {
      const rect = canvas.getBoundingClientRect();
      if (!isLeft) {
        computer.y = e.clientY - rect.top - player.height / 2;
      } else {
        player.color = "red";
        player.y = e.clientY - rect.top - player.height / 2;
      }

      socket.emit("updatePaddle", {
        userId: user.id,
        room: room,
        paddle: isLeft ? player.y : computer.y,
        isLeft: isLeft,
      });
    };

    const handleKey = (e: any) => {
      if (e.key === "ArrowUp") {
        if (!isLeft) {
          computer.y -= 25;
        } else {

          player.y -= 25;
        }
      }
      if (e.key === "ArrowDown") {
        if (!isLeft) {
          computer.y += 25;
        } else {

          player.y += 25;
        }
      }
      socket.emit("updatePaddle", {
        userId: user.id,
        room: room,
        paddle: isLeft ? player.y : computer.y,
        isLeft: isLeft,
      });
    };



    socket.on("resivePaddle", (data: any) => {
      if (!isLeft) {
        player.y = data;
      } else {
        computer.y = data;
      }
    });

    socket.on("updateTheBall", (ballPosition: Ball) => {
      ball.x = ballPosition.x * ratio;
      ball.y = ballPosition.y;
      ball.velocityX = ballPosition.velocityX * ratio;
      ball.velocityY = ballPosition.velocityY;
      drawCanvas(ctx, canvas, canvasCtx, ball, computer, player, difficulty);
    });

    socket.on("updateScore", (scorePlayer1: number, scorePlayer2: number) => {
      player.score = scorePlayer1;
      computer.score = scorePlayer2;
    });

    socket.on("clientDisconnected", () => {

    });
    socket.on("gameOver", (state: string) => {
      setInterval(() => {
        if (state === "win") {
          drawText(ctx, "You win!", canvasCtx.width / 2, canvasCtx.height / 2);
        }
        else if (state === "lose") {
          drawText(ctx, "You Lose!", canvasCtx.width / 2, canvasCtx.height / 2);
        }
        else if (state === "draw") {
          drawText(ctx, "You draw!", canvasCtx.width / 2, canvasCtx.height / 2);
        }
      }, 20);
      setTimeout(() => {
        router.push('/protected/GamePage');
      }, 2500);
    });
    function handleWindowResize() {
      setWidth(window.innerWidth);
      if (window.innerWidth < 600) {
        ratio = (window.innerWidth - 80) / 600;
        canvasCtx.width = window.innerWidth - 80;
        computer.x = canvasCtx.width - 15;
      }
      else if (window.innerWidth > 600) {
        ratio = 1;
        canvasCtx.width = 600;
        computer.x = canvasCtx.width - 15;
      }
    }

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      router.replace('/protected/GamePage/random');
      socket?.emit("opponentLeft", { room: room, userId: user.id });

    };
    const handleToucMove = (e: any) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        // Get the position of the canvas
        const rect = canvas.getBoundingClientRect();
    
        // // Update the player's Y-coordinate based on the first touch point
        // player.y = e.touches[0].clientY - rect.top - player.height / 2;

        if (!isLeft) {
          computer.y = e.touches[0].clientY  - rect.top - player.height / 2;
        } else {
          player.color = "red";
          player.y = e.touches[0].clientY  - rect.top - player.height / 2;
        }
  
        socket.emit("updatePaddle", {
          userId: user.id,
          room: room,
          paddle: isLeft ? player.y : computer.y,
          isLeft: isLeft,
        });
      }

    }
    window.addEventListener('touchmove', handleToucMove);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKey);


    return () => {
      window.removeEventListener('touchmove', handleToucMove);
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(animationFrameId1);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("keydown", handleKey);
      socket.off("gameOver");
      socket.off("updateScore");
      socket.off("updateTheBall");
      socket.off("resivePaddle");
      socket.off("updatePaddle");

    };
  }, [router]);

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
