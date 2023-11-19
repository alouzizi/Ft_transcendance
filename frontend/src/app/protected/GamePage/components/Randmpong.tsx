import {  useEffect, useRef, useState } from "react";
import { Ball, Padlle, useCanvas } from "./interface";
import  { drawCanvas } from "./pongUtils";
import { useGlobalContext } from "@/app/context/store";
import {useRouter } from "next/navigation";


interface PongProps {
  room: string;
  isLeft: boolean;
  difficulty: number;
}

const Pong = ({ room, isLeft, difficulty }: PongProps) => {

  console.log(difficulty);
  const ROUND_LIMIT = 6;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCtx = useCanvas();
  const { user, socket } = useGlobalContext();
  let animationFrameId: number;
  let animationFrameId1: number;
  const router = useRouter();
  const [alert, setAlert] = useState(0);

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
      drawCanvas(ctx, canvas, canvasCtx, ball, computer, player, difficulty);
    });

    socket.on("updateScore", (scorePlayer1: number, scorePlayer2: number) => {
      player.score = scorePlayer1;
      computer.score = scorePlayer2;
    });

    socket.on("clientDisconnected", () => {
      
    });
    socket.on("gameOver", (state: string) => {
      setTimeout(() => {
        if (state === "win") {
          router.replace('/protected/GamePage');
        }
        if (state === "lose") {
          router.replace('/protected/GamePage');
        }
        if (state === "draw") {
          router.replace('/protected/GamePage');
        }
      }, 1000);
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
      socket?.emit("opponentLeft", {room: room, userId:user.id});

    };

    // function handlePopstate(){
    //   console.log("popstate");
    //   socket?.emit("opponentLeft", {room: room, userId:user.id});
    //   // router.push('/protected/GamePage/random');
    // };

    // window.addEventListener('popstate', handlePopstate);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("mousemove", handleMouseMove);


    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.cancelAnimationFrame(animationFrameId1);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener("resize", handleWindowResize);
      // window.removeEventListener('popstate', () => {

      // });


      socket.off("gameOver");
      // socket.off("clientDisconnected");
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
