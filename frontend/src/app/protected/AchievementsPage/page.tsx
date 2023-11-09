"use client";
import { IoMdArrowRoundBack } from "react-icons/io";

import MyDropDown from "@/app/protected/HistoryPage/components/MyDropDown";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AchievementItem from "./components/AchievementItem";

export default function AchievementsPage() {
  const items = ["All", "Bronz", "Selver", "Gold"];
  const router = useRouter();

  return (
    <div className="flex flex-col bg-color-main h-screen w-screen  ">
      <div className="flex flex-row mt-12 mb-8 ml-8  md:ml-24">
        <IoMdArrowRoundBack
          onClick={() => {
            router.back();
          }}
          className=" my-auto mr-2 text-gray-400 hover:text-white active:text-gray-400 text-2xl md:text-3xl"
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
        <MyDropDown items={items} />

        <div
          className="grid gap-y-2
          
         // small screen
         grid-cols-1

         sm:grid-cols-2 sm:gap-x-4

         // Big screen
         lg:grid-cols-3 lg:gap-x-6
        "
        >
          <AchievementItem
            image="/achiev1.png"
            title="Novice"
            mission="Win 10 matches"
            type="gold"
          />
          <AchievementItem
            image="/achiev1.png"
            title="Novice"
            mission="Win 10 matches"
            type="bronz"
          />
          <AchievementItem
            image="/achiev1.png"
            title="Novice"
            mission="Win 10 matches"
            type="selver"
          />
          <AchievementItem
            image="/achiev1.png"
            title="Novice"
            mission="Win 10 matches"
            type="bronz"
          />
        </div>
      </div>
    </div>
  );
}
