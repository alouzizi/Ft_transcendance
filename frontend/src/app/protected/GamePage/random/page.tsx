"use client";
import { useGlobalContext } from "@/app/context/store";
import Pong from "../components/Randmpong";
import { Canvas, canvasContext } from "../components/interface";
import { WebsocketContext, WebsocketProvider, socket } from "../contexts/WebsocketContext";
import { useContext, useEffect, useState } from "react";
// import WaitingForPlayer from "../components/WaitingForPlayer";


export default function Home() {
  const { user } = useGlobalContext();
  const socket = useContext(WebsocketContext);

  const canvas: Canvas = {
    width: 600,
    height: 400,
  };

  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    console.log("useEffects");
    const handleStartGame = () => {
      console.log('allo--------->: Game started!');
      setGameStarted(true);
    };

    socket.on("startGame", handleStartGame);

    // Clean up the listener when the component unmounts.
    return () => {
      // socket.off("startGame", handleStartGame);
    };
  }, [user.id]);
  
console.log("allo: ", user.id);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      {/* <WebsocketProvider value={socket}> */}
        {/* <canvasContext.Provider value={canvas}> */}
          {/* {gameStarted ? <Pong /> : null} */}
        {/* </canvasContext.Provider> */}
      {/* </WebsocketProvider> */}
    </div>
  );
}
