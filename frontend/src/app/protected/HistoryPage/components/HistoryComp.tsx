"use client";
import { IoMdArrowRoundBack } from "react-icons/io";

import HistoryItem from "@/app/protected/HistoryPage/components/HistoryItem";
import MyDropDown from "@/app/protected/HistoryPage/components/HistoryDropDown";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../../context/store";
import { getGameHistory } from "@/app/MyApi/gameApi";

export default function HistoryComp(prompt: { friend: ownerDto }) {
  const items = ["All", "Wins", "Loses", "Draws"];
  const router = useRouter();
  const { updateInfo } = useGlobalContext();
  const [gameHistory, setGameHistory] = useState<gameHistoryDto[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const gameHistoryTmp = await getGameHistory(prompt.friend.id);
        setGameHistory(gameHistoryTmp);
      } catch (error: any) {
        //console.log("getData error: " + error);
      }
    }
    getData();
  }, [updateInfo]);

  return (
    <div className="flex flex-col bg-color-main h-fit w-screen min-h-screen ">
      <div className="flex flex-row mt-6 md:mt-12 mb-4 md:mb-8 ml-8  md:ml-12">
        <IoMdArrowRoundBack
          onClick={() => {
            router.back();
          }}
          className="cursor-pointer my-auto mr-2 text-gray-400 hover:text-white active:text-gray-400 text-2xl md:text-3xl"
        />
        <h1 className="text-left font-bold text-md sm:text-lg md:text-2xl ">
          Game History
        </h1>
      </div>
      <MyDropDown
        items={items}
        gameHistory={gameHistory}
        friend={prompt.friend}
      />
    </div>
  );
}
