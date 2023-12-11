"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import HistoryItem from "./HistoryItem";
import { useGlobalContext } from "../../context/store";
import { getGameHistory } from "@/app/MyApi/gameApi";
import { useRouter } from "next/navigation";

export default function HistoryDropDown(prompt: {
  items: string[];
  gameHistory: gameHistoryDto[];
  friend: ownerDto;
}) {
  const router = useRouter();
  const [position, setPosition] = React.useState("All");
  const { updateInfo } = useGlobalContext();
  const [gameHistoryFormated, setGameHistoryFormated] = React.useState<
    gameHistoryDto[]
  >(prompt.gameHistory);

  React.useEffect(() => {
    function isWined(record: gameHistoryDto, isWined: boolean) {
      let senderId = record.receiverId;
      let receiverId = record.senderId;
      let senderPoints = record.senderPoints;
      let receiverPoints = record.receiverPoints;
      if (isWined) {
        senderId = record.receiverId;
        receiverId = record.senderId;
        senderPoints = record.receiverPoints;
        receiverPoints = record.senderPoints;
      }
      if (senderId === prompt.friend.id) {
        return parseInt(senderPoints) > parseInt(receiverPoints);
      } else if (receiverId === prompt.friend.id) {
        return parseInt(senderPoints) < parseInt(receiverPoints);
      }
    }
    function selectItems() {
      let gameHistoryTmp = prompt.gameHistory;
      if (position === "Wins") {
        gameHistoryTmp = gameHistoryTmp.filter((record) =>
          isWined(record, true)
        );
      } else if (position === "Loses") {
        gameHistoryTmp = gameHistoryTmp.filter((record) =>
          isWined(record, false)
        );
      } else if (position === "Draws") {
        gameHistoryTmp = gameHistoryTmp.filter(
          (record) =>
            parseInt(record.senderPoints) === parseInt(record.receiverPoints)
        );
      }
      setGameHistoryFormated(gameHistoryTmp);
      // //console.log("gameHistoryFormated", gameHistoryFormated);
    }

    selectItems();
  }, [position, updateInfo]);
  React.useEffect(() => {
    async function getData() {
      try {
        const gameHistoryTmp = await getGameHistory(prompt.friend.id);
        setGameHistoryFormated(gameHistoryTmp);
      } catch (error: any) {
        //console.log("getData error: " + error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center mb-6 md:mb-12 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="flex flex-row justify-between w-fit bg-white text-color-main rounded-md  cursor-pointer
                            py-1 px-2 md:px-4 text-sm md:text-base"
            >
              <p className="text-md ">{position}</p>
              <IoIosArrowDropdownCircle
                className=" my-auto ml-2 text-color-main "
                size={18}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ">
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              {prompt.items.map((item) => (
                <DropdownMenuRadioItem
                  className=" cursor-pointer"
                  key={item}
                  value={`${item}`}
                >
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className=" flex flex-col mx-auto overflow-y-scroll bg-color-main-dark  rounded-lg border-4 border-white
  // transition-all duration-100 ease-in-out 

    // small screen
      mb-12 h-[32rem] p-2  w-[90%]
    // Big screen
    max-w-2xl min-h-2xl  md:w-[65%] sm:p-8 md:h-[48rem]
    "
      >
        {gameHistoryFormated.length !== 0 ? (
          gameHistoryFormated
            .reverse()
            .map((record) => (
              <HistoryItem
                key={record.id}
                firstPlayerName={record.senderUsr}
                firstPlayerPoints={record.senderPoints}
                secondPlayerName={record.receiverUsr}
                secondPlayerPoints={record.receiverPoints}
                firstPlayerImg={record.senderAvatar}
                secondPlayerImg={record.receiverAvatar}
              />
            ))
        ) : (
          <p className="mx-auto my-3 text-gray-500 text-lg">No Matches here!</p>
        )}
      </div>
    </div>
  );
}
