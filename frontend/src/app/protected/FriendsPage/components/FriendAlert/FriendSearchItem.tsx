"use client";
import { FaMessage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
export default function FriendSearchItem(prompt: {
  friendImg: string;
  friendName: string;
}) {
  return (
    <div
      className="cursor-pointer my-2  flex flex-row justify-between border-b-2 border-gray-300 bg-white
     hover:border-color-main transition ease-in-out delay-50 py-2 px-2  mx-8"
    >
      <div className="flex flex-row ">
        <img
          className="object-cover mx-auto  rounded-full 
          
        // small screen
        w-10 h-10
        // Big screen
        md:w-12 md:h-12
        "
          src={prompt.friendImg}
          alt=""
        />
        <p
          className="ml-4 my-auto
        
        // small screen
        text-xs
        // Big screen
        md:text-sm
        "
        >
          {prompt.friendName}
        </p>
      </div>
      <div className="flex flex-row ">
        <button className="bg-color-main rounded-md text-white px-3 py-1 my-auto mx-2 h-fit text-xs ">
          invite
        </button>
        <div className="my-auto mr-2 hover: bg-color-main text-white p-2 rounded-full">
          <FaMessage />
        </div>
      </div>
    </div>
  );
}
