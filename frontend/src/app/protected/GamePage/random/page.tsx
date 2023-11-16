"use client";
import { useGlobalContext } from "@/app/context/store";
import Pong from "../components/Randmpong";
import { Canvas, canvasContext } from "../components/interface";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

export default function Home() {
  const { user, socket } = useGlobalContext();
  const router = useRouter();
  const [message, setMessage] = useState("Start game!");
  const [room, setRoom] = useState("");
  const [left, setLeft] = useState<boolean>(true);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [gameStarted, setGameStarted] = useState(false);
  const [width, setWidth] = useState<number>();
  const startGameHandler = () => {
    if (!buttonClicked) {
      setMessage("Waiting for another player...");
      socket?.emit("clientId", user.id);
      socket?.emit("joinRoom", user.id);
      setButtonClicked(true);
    }
  };

  const canvas: Canvas = {
    width: 600,
    height: 400,
  };

  if (window.innerWidth < 600) {
    canvas.width = window.innerWidth - 80;
  }
  useEffect(() => {
    // if (window.innerWidth < 600) {
    //   setWidth(window.innerWidth -150);
    //   canvas.width = window.innerWidth -150;
    // }

    socket?.on("startGame", (room: string) => {
      setRoom(room);
      setGameStarted(true);
      console.log({ isLeft: left });
      setMessage("Game started! You can play now.");
      console.log("aloo: game started");
    });

    socket?.on("whichSide", (isLeft: boolean) => {
      setLeft(isLeft);
    });

    socket?.on("alreadyExis", () => {
      router.push("/protected/GamePage");
    });
    // window.addEventListener("resize", () => {
    //   setWidth(window.innerWidth);
    //   if (window.innerWidth < 600) {
    //     canvas.width = window.innerWidth -150;
    //   }
    //   else
    //     canvas.width = 600;
    // });
    return () => {
      // window.removeEventListener("resize", () => {});
      socket?.off("startGame");
      socket?.off("whichSide");
    };
  }, [user.id]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-color-main">
      {/* <WebsocketProvider value={socket}> */}
      <div className="flex flex-row mb-8">
        <button className="bg-color-main-whith text-white px-2 py-1 mx-2 focus:ring-2 ring-white rounded-md">
          Easy
        </button>
        <button className="bg-color-main-whith text-white px-2 py-1 mx-2 focus:ring-2 ring-white rounded-md">
          Normal
        </button>
        <button className="bg-color-main-whith text-white px-2 py-1 mx-2 focus:ring-2 ring-white rounded-md">
          Hard
        </button>
      </div>
      <canvasContext.Provider value={canvas}>
        {!gameStarted && (
          <div className="flex flex-row justify-between items-center  bg-black rounded-md w-96 h-96">
            <div className="bg-white w-3 h-1/3 rounded-full mb-4 ml-4"></div>

            <div className="h-full w-fit text-white flex flex-col  relative border-t-red-100">
              <div className="h-96 border-r-2 w-0 border-dotted mx-auto" />
              <button
                className="bg-color-main-whith text-white px-2 py-1 rounded-md"
                onClick={startGameHandler}
                disabled={buttonClicked}
              >
                {message}
              </button>
              <div className="h-96 border-r-2 w-0 border-dotted mx-auto" />
            </div>

            <div className="bg-white w-3 h-1/3 rounded-full mb-24 mr-4"></div>
          </div>
        )}
        {gameStarted && <Pong room={room} isLeft={left} />}
      </canvasContext.Provider>
      {/* </WebsocketProvider> */}
    </div>
  );
}
