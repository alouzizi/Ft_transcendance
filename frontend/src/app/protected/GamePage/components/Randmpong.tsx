import { useContext, useEffect, useRef, useState } from "react";
import { Ball, Padlle, useCanvas } from "./interface";
import updateCanvas, { drawCanvas, drawText, resetBall } from "./pongUtils";
import { useGlobalContext } from "@/app/context/store";
import Alert from '@mui/joy/Alert';
import { useRouter } from "next/navigation";
import { Ratio } from "lucide-react";


interface PongProps {
  room: string;
  isLeft: boolean;
}

const Pong = ({ room, isLeft }: PongProps) => {
  const ROUND_LIMIT = 6;
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
  useEffect(() => {
    if (!socket) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const handleMouseMove = (e: any) => {
      const rect = canvas.getBoundingClientRect();
      if (!isLeft) {
        const mouseY = e.clientY - rect.top - computer.height / 2;
        computer.color = "red";
        computer.y = Math.min(
          Math.max(mouseY, 0),
          canvas.height - computer.height
        );
      } else {
        const mouseY = e.clientY - rect.top - player.height / 2;
        player.color = "red";
        player.y = Math.min(Math.max(mouseY, 0), canvas.height - player.height);
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
        // player.score = data.score;
      } else {
        computer.y = data;
        // computer.score = data;
      }
    });

    socket.on("updateTheBall", (ballPosition: Ball) => {
      ball.x = ballPosition.x * ratio;
      ball.y = ballPosition.y;
      ball.velocityX = ballPosition.velocityX * ratio ;
      ball.velocityY = ballPosition.velocityY;
      ball.color = ballPosition.color;
      drawCanvas(ctx, canvas, canvasCtx, ball, computer, player);
    });
    socket.on("updateScore", (scorePlayer1: number, scorePlayer2: number) => {
      player.score = scorePlayer1;
      computer.score = scorePlayer2;
      drawText(ctx, canvasCtx.width / 4, canvasCtx.height / 5, player.score);
      drawText(
        ctx,
        (3 * canvasCtx.width) / 4,
        canvasCtx.height / 5,
        computer.score
      );
    });

    socket.on("gameOver", (state: string) => {
      setTimeout(() => {
        if (state === "win") {

          <Alert variant="solid"  size="lg" color="success"> You Win</Alert>
          // console.log("test");
          router.push('/protected/GamePage');
          // alert("You win!");
        }
        if (state === "lose") {
          <Alert variant="solid"  size="lg" color="warning"> You lose</Alert>
          // console.log("test");
          router.push('/protected/GamePage');
          // alert("You lose!");
        }
        if (state === "draw") {
          <Alert  variant="solid" size="lg" color="neutral"> You draw</Alert>
          // console.log("test");
          router.push('/protected/GamePage');
          // alert("Draw!");
        }
      }, 1000);
    });
    function handleWindowResize() {
      setWidth(window.innerWidth);
      if (window.innerWidth < 600) {
        ratio = window.innerWidth / 600;
      canvasCtx.width = window.innerWidth - 200;
      computer.x = canvasCtx.width - 15;
      }
      else if (window.innerWidth > 600) {
        ratio = 1;
        canvasCtx.width = 600;
        computer.x = canvasCtx.width - 15;
      }
      // drawCanvas(ctx, {width: width, hight: 400}, canvasCtx, ball, computer, player);
    }
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(animationFrameId1);
      window.removeEventListener("mousemove", handleMouseMove);
      socket.off("connect");
      socket.off("updatePaddle");
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
