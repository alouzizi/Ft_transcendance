"use client";

import { Canvas, canvasContext } from "../components/interface";
import Pong from "../components/Bootpong";

export default function Home() {
  const canvas: Canvas = {
    width: 600,
    height: 400,
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-color-main">
      <canvasContext.Provider value={canvas}>
				<Pong/>
			</canvasContext.Provider>
    </div>
  );
}
