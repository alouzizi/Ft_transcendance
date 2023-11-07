"use client";
import { useGlobalContext } from "@/app/context/store";
import Pong from "../components/Randmpong";
import { Canvas, canvasContext } from "../components/interface";
import { WebsocketContext, WebsocketProvider, socket } from "../contexts/WebsocketContext";
import { useContext, useEffect, useState } from "react";
import WaitingForPlayer from "../components/WaitingForPlayer";


export default function Home() {
  const { user } = useGlobalContext();
  const socket = useContext(WebsocketContext);

  const canvas: Canvas = {
    width: 600,
    height: 400,
  };

  const [gameStarted, setGameStarted] = useState(false);
  
  useEffect(() => {
    socket.on('startGame', () => {
      setGameStarted(true);
    });

    return () => {
      socket.off('startGame');
    };
  }, [user.id]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-color-main">
      <WebsocketProvider value={socket}>
        <canvasContext.Provider value={canvas}>
          <WaitingForPlayer />
          {gameStarted ? <Pong /> : null}
        </canvasContext.Provider>
      </WebsocketProvider>
    </div>
  );
}
