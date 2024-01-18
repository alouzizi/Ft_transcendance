"use client";

import Link from "next/link";

export default function LeaderBItem(prompt: {
  playerRank: string;
  playerAvatar: string;
  playerUser: string;
  playerLevel: string;
  PlayerNbrOfMatches: string;
  playerWinRate: string;
}) {
  return (
    <div
      className="transition ease-in-out delay-20 cursor-default
    flex flex-row justify-between  hover:scale-105 
     bg-white items-center  hover:text-black text-gray-400 
     py-1 px-2
     text-[0.4rem] rounded-md
     sm:text-sm sm:rounded-xl sm:py-2
     md:text-md md:py-4 md:px-8 my-2
   
     "
    >
      <p
        className=" text-color-main-whith font-700  w-1/6
      text-[0.7rem] 
      sm:text-lg 
      md:text-2xl

      "
      >{`#${prompt.playerRank}`}</p>
      <Link
        className="flex flex-row items-center  my-auto cursor-pointer  
        w-2/6
      "
        href={`/protected/DashboardPage/${prompt.playerUser} `}
      >
        <img
          className=" object-cover   rounded-full border-color-main 
          
          // small screen
          w-8 h-8 border-1
          sm:w-10 sm:h-10  
        // Big screen
        md:w-14 md:h-14 md:border-2
          "
          src={prompt.playerAvatar}
          alt=""
        />
        <p
          className="mt-2  text-black 
          font-400  ml-1   md:ml-4
        "
        >
          {prompt.playerUser}
        </p>
      </Link>
      <p className="text-black font-400 w-1/6 text-center sm:text-left">
        {prompt.playerLevel}
      </p>
      <p className="text-black font-400 w-1/6 text-center sm:text-left">
        {prompt.PlayerNbrOfMatches}
      </p>
      <p className="text-black font-400 w-1/6 text-center">
        {prompt.playerWinRate}
      </p>
    </div>
  );
}
