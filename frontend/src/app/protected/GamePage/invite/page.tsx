"use client";

import { useEffect } from "react";
import { useGlobalContext } from "../../context/store";
import Pong from "../components/Randmpong";

import { Canvas, canvasContext } from "../components/interface";


export default function Home() {
    const { inviteData } = useGlobalContext();


    console.log(inviteData);
    const canvas: Canvas = {
        width: 600,
        height: 400,
      };
    useEffect(() => {

    },[])

    return (
    <canvasContext.Provider value={canvas}>
      <div className="flex flex-col justify-center items-center min-h-screen h-fit">
     <Pong room={inviteData.room} isLeft={inviteData.isLeft} difficulty={2}/>
     </div>
     </canvasContext.Provider>
    )
}
