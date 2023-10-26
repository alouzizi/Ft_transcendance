"use client";
import { IoMdArrowRoundBack } from "react-icons/io";

import HistoryItem from "@/app/protected/HistoryPage/components/HistoryItem";
import MyDropDown from "@/app/protected/HistoryPage/components/MyDropDown";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const items = ["All", "Wins", "Loses", "Draws"];
  const [showDropdown, setShowDropdown] = useState(false);
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
          Game History
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
        <HistoryItem
          firstPlayerName="hamza boumahdi"
          firstPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          secondPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          firstPlayerPoints={12}
          secondPlayerName="jalal motaya"
          secondPlayerPoints={5}
        />
        <HistoryItem
          firstPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          secondPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          firstPlayerName="hamza boumahdi"
          firstPlayerPoints={1}
          secondPlayerName="jalal motaya"
          secondPlayerPoints={5}
        />
        <HistoryItem
          firstPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          secondPlayerImg="https://images.alphacoders.com/129/1294445.jpg"
          firstPlayerName="hamza boumahd"
          firstPlayerPoints={5}
          secondPlayerName="jalal motaya"
          secondPlayerPoints={5}
        />
      </div>
    </div>
  );
}
