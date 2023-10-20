"use client";
export default function HistoryItem(prompt: {
  firstPlayerName: string;
  firstPlayerImg: string;
  firstPlayerPoints: number;
  secondPlayerName: string;
  secondPlayerImg: string;
  secondPlayerPoints: number;
}) {
  return (
    <div
      className="transition ease-in-out delay-20 w-full
    flex flex-row justify-between rounded-xl m-2
     hover:bg-white items-center  hover:text-black text-gray-400 p-3 "
    >
      <div className="flex flex-col my-auto cursor-pointer ">
        <img
          className=" object-cover mx-auto  rounded-full 
          
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
      </div>
      <p
        className=" font-bold
      // small screen
      text-sm
    // Big screen
    md:text-lg
      "
      >
        {prompt.firstPlayerPoints} - {prompt.secondPlayerPoints}
      </p>
      <div className="flex flex-col my-auto cursor-pointer">
        <img
          className="object-cover mx-auto  rounded-full 
          
          // small screen
          w-12 h-12
        // Big screen
        md:w-14 md:h-14
        "
          src={prompt.secondPlayerImg}
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
          {prompt.secondPlayerName}
        </p>
      </div>
    </div>
  );
}
