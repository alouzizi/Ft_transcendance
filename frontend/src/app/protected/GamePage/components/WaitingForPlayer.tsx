import { useGlobalContext } from "@/app/context/store";
import React, { useContext, useEffect, useState } from "react";
// import { WebsocketContext } from "../random/contexts/WebsocketContext";

const WaitingForPlayer = () => {
  // const socket = useContext(WebsocketContext);
  const {socket} = useGlobalContext()
  const [message, setMessage] = useState("Waiting for another player...");

  useEffect(() => {
    socket?.on("startGame", () => {
      // setMessage('Game started! You can play now.');
      console.log("Game started!");
    });

    return () => {
      socket?.off("startGame");
    };
  }, []);

  return (
    <div>
      <p className="bg-white">{message}</p>
    </div>
  );
};

export default WaitingForPlayer;
