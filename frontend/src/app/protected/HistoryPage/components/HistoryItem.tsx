"use client";

import Link from "next/link";

export default function HistoryItem(prompt: {
  firstPlayerName: string;
  firstPlayerImg: string;
  firstPlayerPoints: string;
  secondPlayerName: string;
  secondPlayerImg: string;
  secondPlayerPoints: string;
}) {
  return (
    <div
      className="transition ease-in-out delay-20 
    flex flex-row justify-between rounded-xl 
     hover:bg-white items-center  hover:text-black text-gray-400 p-1 md:p-3 my-1
     "
    >
      <div className="flex flex-col justify-start my-auto cursor-pointer w-1/3">
        <Link
          className="flex flex-col w-full items-start "
          href={`/protected/DashboardPage/${prompt.firstPlayerName}`}
        >
          <img
            className=" object-cover   rounded-full 
          
          // small screen
          w-12 h-12
        // Big screen
        md:w-14 md:h-14
          "
            src={prompt.firstPlayerImg}
            alt=""
          />
          <p
            className="mt-2 font-medium 
         // small screen
         text-xs
       // Big screen
       md:text-sm
        
        "
          >
            {prompt.firstPlayerName}
          </p>
        </Link>
      </div>
      <p
        className=" font-bold bg-color-main-whith  rounded-md text-white
      // small screen
      text-xs py-1 px-2
     // Big screen 
    md:text-lg md:px-4 
      "
      >
        {prompt.firstPlayerPoints} - {prompt.secondPlayerPoints}
      </p>
      <div className="flex flex-col items-end my-auto cursor-pointer w-1/3 ">
        <Link
          className="flex flex-col w-full items-end "
          href={`/protected/DashboardPage/${prompt.secondPlayerName}`}
        >
          <img
            className="object-cover  rounded-full mr-
          
          // small screen
          w-12 h-12 
        // Big screen
        md:w-14 md:h-14
        "
            src={prompt.secondPlayerImg}
            alt=""
          />
          <p
            className="mt-2 font-medium text-end
        // small screen
        text-xs
      // Big screen
      md:text-sm
        "
          >
            {prompt.secondPlayerName}
          </p>
        </Link>
      </div>
    </div>
  );
}
