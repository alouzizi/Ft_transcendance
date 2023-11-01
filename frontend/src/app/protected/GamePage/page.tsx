"use client";

import { Canvas } from "./components/interface";
import MyComponent from "./components/playBord";

export default function Home() {
  const canvas: Canvas = {
    width: 600,
    height: 400,
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#393f4d]">
      {/* <canvasContext.Provider value={canvas}>
				<Pong/>
			</canvasContext.Provider> */}

      <MyComponent
        imageSrc="/boot.jpg"
        text="Pongmaster BOt is your ultimate training partner 
				in the game, helping you hone your skills 
				to become true Pong champions."
        link="/"
      />
      <MyComponent
        imageSrc={"/random.jpg"}
        text={
          "Pongmaster RANDOM is when you challenge your skills \
				against unpredictable opponents in thrilling, \
				random-match gameplay!"
        }
        link={"#"}
      />
    </div>
  );
}
