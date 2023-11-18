"use client";
import MyComponent from "./components/playBord";

export default function Home() {
  return (
    <div className="mt-12 mb-8 ml-8  md:ml-24 min-h-screen h-fit">
      <h1 className="text-white text-2xl/[29px] font-fredoka font-700 mb-40">
        Games
      </h1>
      <div className=" max-w-[48rem] p-4 flex flex-col mx-auto">
        <h2 className="text-[#C4C4C4]  text-xl/[18px] text-left w-full font-fredoka font-700 font-normal mb-5">
          Training
        </h2>
        <MyComponent
          imageSrc="/boot.jpg"
          title="pongmaster bot"
          text="Pongmaster BOT is your ultimate training partner in the game, helping you hone your skills to become a true Pong champion."
          link="/protected/GamePage/boot"
        />
        <h2
          className="text-[#C4C4C4] text-xl/[18px] text-left w-full font-700 font-fredoka font-normal mb-5"
          style={{ textAlign: "left" }}
        >
          Random
        </h2>
        <MyComponent
          imageSrc="/random.jpg"
          title="pongmaster random"
          text="Pongmaster RANDOM is when you challenge your skills against unpredictable opponents in thrilling, random-match gameplay!"
          link="/protected/GamePage/random"
        />
      </div>
    </div>
  );
}
