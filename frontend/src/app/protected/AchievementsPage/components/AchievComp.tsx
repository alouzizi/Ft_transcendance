"use client";
import { IoMdArrowRoundBack } from "react-icons/io";

import { useRouter } from "next/navigation";
import AchievDropDown from "./AchievDropDown";

export default function AchievComp(prompt: { friend: ownerDto }) {
  const items = ["All", "Bronz", "Selver", "Gold"];
  const router = useRouter();

  return (
    <div className="flex flex-col bg-color-main h-screen w-screen  ">
      <div className="flex flex-row mt-12 mb-8 ml-8  md:ml-24">
        <IoMdArrowRoundBack
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer my-auto mr-2 text-gray-400 hover:text-white active:text-gray-400 text-2xl md:text-3xl"
        />
        <h1 className="text-left font-bold text-lg md:text-2xl ">
          Achievements
        </h1>
      </div>
      <div
        className=" flex flex-col justify-center mx-auto
      // transition-all duration-100 ease-in-out 

        // small screen
        w-[70%]  p-2 h-fit mb-12 max-w-8xl 
        // Big screen
        "
      >
        <AchievDropDown items={items} friend={prompt.friend} />
      </div>
    </div>
  );
}
