"use client";
import { useGlobalContext } from "@/app/context/store";
import Pong from "../components/Randmpong";
import { Canvas, canvasContext } from "../components/interface";
import {
  WebsocketContext,
  WebsocketProvider,
} from "../contexts/WebsocketContext";
import { useContext, useEffect, useState } from "react";

// import WaitingForPlayer from "../components/WaitingForPlayer";

export default function Home() {
  const { user } = useGlobalContext();
  const socket = useContext(WebsocketContext);
  const [message, setMessage] = useState("Waiting for another player...");
  const canvas: Canvas = {
    width: 600,
    height: 400,
  };
  let roomName: string;
  const [gameStarted, setGameStarted] = useState(false);
  const startGameHandler = () => {
    socket.emit("joinRoom", user.id, () => {
      console.log("Acknowledgment from server:");
    });
  };

  useEffect(() => {
    socket.on("startGame", (room: string) => {
      setGameStarted(true);
      roomName = room;
      setMessage("Game started! You can play now.");
      console.log("aloo: game started");
    });

    return () => {
      socket.off("startGame");
      // socket.off("joinRoom");
    };
  }, [user.id]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-color-main">
      <WebsocketProvider value={socket}>
        <canvasContext.Provider value={canvas}>
          {!gameStarted && (
            <div className="flex flex-col justify-center m-auto bg-black rounded-md w-96 h-96">
              <div className="bg-white w-3 h-1/3 rounded-full mb-4"></div>
              {/* <p className="bg-white">{message}</p> */}
              <button
                className="bg-color-main-whith text-white w-fit mx-auto px-2 py-1 rounded-md"
                onClick={startGameHandler}
              >
                Start Game
              </button>
            </div>
          )}
          {gameStarted && <Pong/>}

          </canvasContext.Provider>
      </WebsocketProvider>
    </div>
  );
}
