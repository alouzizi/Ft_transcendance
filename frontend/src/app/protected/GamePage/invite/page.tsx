"use client";

import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import Pong from "../components/Randmpong";
import { useRouter } from "next/navigation";
import { Canvas, canvasContext } from "../components/interface";


export default function Home() {
  const [showAlert, setShowAlert] = useState(false);
    const { inviteData, socket , user} = useGlobalContext();
  const router = useRouter();
  
  
  
  const canvas: Canvas = {
      width: 600,
      height: 400,
    };
  useEffect(() => {
    
    socket?.on("opponentLeft", () => {
      router.push("/protected/GamePage");
  
    });
  
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  
        const handlePopstate = (event: PopStateEvent) => {

  
          // if(gameStarted)
          // {
          // event.preventDefault();
          // event/
          // if(gameStarted)
          // {
            // if (gameStarted)
              socket?.emit("opponentLeft", { userId: user.id, room: inviteData.room,});
            // setRoom("");
            // setButtonClicked(false);
            // setGameStarted(false);
            // setMessage("Start game!");
  
          // }
  
          // setShowAlert(true);
          // router.push('/protected/GamePage/random');
  
          // }
        };
      window.addEventListener("popstate", handlePopstate);
      return () => {
        socket?.off("opponentLeft");
      }
    },[socket ,showAlert])

    return (
    <canvasContext.Provider value={canvas}>
      <div className="flex flex-col justify-center items-center min-h-screen h-fit">
     <Pong room={inviteData.room} isLeft={inviteData.isLeft} difficulty={2}/>
     </div>
     </canvasContext.Provider>
    )
}
