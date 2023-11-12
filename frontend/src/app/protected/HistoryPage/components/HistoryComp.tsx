"use client";
import { IoMdArrowRoundBack } from "react-icons/io";

import HistoryItem from "@/app/protected/HistoryPage/components/HistoryItem";
import MyDropDown from "@/app/protected/HistoryPage/components/HistoryDropDown";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGameHistory } from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";

export default function HistoryComp(prompt: { friend: ownerDto }) {
  const items = ["All", "Wins", "Loses", "Draws"];
  const router = useRouter();
  const { updateInfo } = useGlobalContext();
  const [gameHistory, setGameHistory] = useState<gameHistoryDto[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const gameHistoryTmp = await getGameHistory(prompt.friend.nickname);

        setGameHistory(gameHistoryTmp);
      } catch (error: any) {
        console.log("getData error: " + error);
      }
    }
    getData();
  }, [updateInfo]);

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
