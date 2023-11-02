"use client";
import { FaMessage } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../../components/ui/tooltip";

import PopoverMenu from "./PopoverMenu";
import { useContext } from "react";
import { useGlobalDataContext } from "./FriendCategory";

export default function FriendItem(prompt: { friendInfo: friendDto }) {
  function handleBlockFriend(): void {
    console.log("block" + prompt.friendInfo.id);
  }

  return (
    <div className="cursor-pointer my-2  flex flex-row justify-between bg-[#2A2F40] hover:bg-[#515562] py-2 px-4 rounded-lg">
      <div className="flex flex-row ">
        <img
          className="object-cover mx-auto  rounded-full 
          
        // small screen
        w-12 h-12
        // Big screen
        md:w-14 md:h-14
        "
          src={prompt.friendInfo.avatar}
          alt=""
        />
        <p
          className="ml-4 my-auto
        
        // small screen
        text-sm
        // Big screen
        md:text-md
        "
        >
          {prompt.friendInfo.username}
        </p>
      </div>
      <div className="flex flex-row ">
        <PopoverMenu friendInfo={prompt.friendInfo} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="my-auto mr-4 hover: bg-color-main p-2 rounded-full">
                <FaMessage />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-color-main text-white border-gray-400">
              <p>Message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
