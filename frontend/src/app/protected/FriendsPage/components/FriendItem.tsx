"use client";
import { FaMessage } from "react-icons/fa6";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../../../../components/ui/tooltip";
import Tooltip from "@mui/material/Tooltip";
import PopoverMenu from "./PopoverMenu";
import { useContext } from "react";
import { useGlobalDataContext } from "./FriendCategory";
import { IoPersonRemove } from "react-icons/io5";
import { BiUserX } from "react-icons/bi";
import { blockFriend, unblockFriend } from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";

export default function FriendItem(prompt: {
  friendInfo: friendDto;
  itemsStatus: string;
}) {
  // ==================== handleUnblock =====================
  const user = useGlobalContext();
  const contxt = useGlobalDataContext();
  async function handleUnblock(): Promise<void> {
    try {
      await unblockFriend(user.user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
    } catch (error) {
      console.log("handleBlockFriend: " + error);
    }
    // handleClose();
    console.log("handleUnblock" + prompt.friendInfo.id);
  }
  // ==================== /handleUnblock =====================

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
      {prompt.itemsStatus !== "Blocked" ? (
        <div className="flex flex-row ">
          <PopoverMenu friendInfo={prompt.friendInfo} />

          <Tooltip title="Message" placement="top" className="text-lg">
            <div className="my-auto mr-4 hover: bg-color-main p-2 rounded-full">
              <FaMessage />
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className="flex flex-row ">
          <Tooltip title="Unblock" placement="top" className="text-lg">
            <div
              onClick={handleUnblock}
              className="my-auto mr-4 bg-color-main p-2 rounded-full hover:text-red-600 text-lg"
            >
              <BiUserX />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
