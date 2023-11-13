import { useContext, useEffect, useRef } from "react";
import { Ball, Padlle, useCanvas } from "./interface";
import updateCanvas, { drawCanvas, drawText, resetBall } from "./pongUtils";
import { WebsocketContext } from "../random/contexts/WebsocketContext";
import { useGlobalContext } from "@/app/context/store";
import { set } from "date-fns";

interface PongProps {
  room: string;
  isLeft: boolean;
}

const Pong = ({ room, isLeft }: PongProps) => {

  const ROUND_LIMIT = 6;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useCanvas();
  const { user } = useGlobalContext();
  const socket = useContext(WebsocketContext);
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
    color: "#05EDFF",
  };

  useEffect(() => {
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
      // console.log("mouseY: ", player.y);

      socket.emit("updatePaddle", {
        userId: user.id,
        room: room,
        paddle: isLeft ? player : computer,
        isLeft: isLeft,
      });
      console.log("allo: sending paddle update!");
    };
    // let test: number;
    socket.on("resivePaddle", (data: any) => {
      // console.log('Paddle update received --------------->');
      // console.log(data);
      if (!isLeft) {
        player.y = data.y;
        player.score = data.score;
      } else {
        computer.y = data.y;
        computer.score = data.score;
      }
      // console.log({data: data});
      console.log({ computer: computer.y });
    })

    // resetBall(canvasCtx, ball);
    // function update() {
      // let computerLevel = 1;
      // let desiredComputerY = ball.y - computer.height / 2;
      // desiredComputerY = Math.min(
      //   Math.max(desiredComputerY, 0),
      //   canvasCtx.height - computer.height
      // );
      // computer.y += (desiredComputerY - computer.y) * computerLevel;
      // computer.y = test;
      // console.log("computer.y: ", computer.y);

      // updateCanvas(canvasCtx, ball, computer, player);
      socket.on('updateTheBall', (ballPosition: Ball) =>{
        // console.log({ballPosition: ballPosition});
        // console.log({ballPosition: ballPosition.color})
        ball.x = ballPosition.x;
        ball.y = ballPosition.y;
        ball.velocityX = ballPosition.velocityX;
        ball.velocityY = ballPosition.velocityY;
        ball.color = ballPosition.color;
        drawCanvas(ctx, canvas, canvasCtx, ball, computer, player);
      });
      socket.on("updateScore", (scorePlayer1: number, scorePlayer2: number) => {
        player.score = scorePlayer1;
        computer.score = scorePlayer2;
        console.log({ player: player.score, computer: computer.score });
        drawText(ctx, canvasCtx.width / 4, canvasCtx.height / 5, player.score);
        drawText(
          ctx,
          (3 * canvasCtx.width) / 4,
          canvasCtx.height / 5,
          computer.score
        );
      });

      socket.on("gameOver", (state: string) => {
        // drawText(ctx, canvasCtx.width / 4, canvasCtx.height / 5, player.score);
        // drawText(
        //   ctx,
        //   (3 * canvasCtx.width) / 4,
        //   canvasCtx.height / 5,
        //   computer.score
        // );
        setTimeout(() => {
        if (state === "win") {
          alert("You win!");
        }
        if (state === "lose") {
          alert("You lose!");
        }
        if (state === "draw") {
          alert("Draw!");
        }
      }, 1000);
      });
      // animationFrameId1 = window.requestAnimationFrame(update);
    // }
    // setInterval(update, 5);
    // animationFrameId = window.requestAnimationFrame(update);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(animationFrameId1);
      window.removeEventListener("mousemove", handleMouseMove);
      console.log("allo: unregistering Events !");
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
