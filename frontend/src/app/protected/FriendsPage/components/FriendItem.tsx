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
import {
  acceptFriendRequest,
  blockFriend,
  rejectFriendRequest,
  unblockFriend,
  unsendFriendRequest,
} from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Badge from "@mui/material/Badge";
import { green } from "@mui/material/colors";
import Link from "next/link";
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
    console.log("handleUnblock" + prompt.friendInfo.id);
  }
  // ==================== /handleUnblock =====================

  // ==================== handleReject =====================
  async function handleReject(): Promise<void> {
    try {
      await rejectFriendRequest(user.user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
    } catch (error) {
      console.log("handleReject: " + error);
    }
  }
  // ==================== /handleReject =====================

  // ==================== handleAccept =====================
  async function handleAccept(): Promise<void> {
    try {
      await acceptFriendRequest(user.user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
    } catch (error) {
      console.log("handleAccept: " + error);
    }
  }
  // ==================== /handleAccept =====================

  // ==================== handleCancel =====================
  async function handleCancel(): Promise<void> {
    try {
      await unsendFriendRequest(user.user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
    } catch (error) {
      console.log("handleCancel: " + error);
    }
  }
  // ==================== /handleCancel =====================

  return (
    <div className=" my-2  flex flex-row justify-between bg-[#2A2F40] hover:bg-[#515562] py-2 px-4 rounded-lg">
      <Link href={`/protected/DashboardPage/${prompt.friendInfo.username}`}>
        <div className="flex flex-row cursor-pointer">
          {/* <Badge badgeContent={0} color="success" invisible={false} /> */}
          <Badge
            badgeContent={4}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor:
                  prompt.friendInfo.status === "ACTIF" ? "#15ff00" : "#9b9c9b",
                width: 22,
                height: 22,
                borderRadius: 50,
                border: "4px solid #2A2F40",
              },
            }}
            variant="dot"
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
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
          </Badge>
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
      </Link>
      {prompt.itemsStatus === "Blocked" ? (
        <div className="flex flex-row cursor-pointer">
          <Tooltip title="Unblock" placement="top" className="text-lg">
            <div
              onClick={handleUnblock}
              className="my-auto mr-4 bg-color-main p-2 rounded-full hover:text-red-600 text-lg"
            >
              <BiUserX />
            </div>
          </Tooltip>
        </div>
      ) : prompt.itemsStatus === "Pending" ? (
        prompt.friendInfo.isYouSender ? (
          <div className="flex flex-row cursor-pointer">
            <Tooltip title="Cancel" placement="top" className="text-lg">
              <div
                onClick={handleCancel}
                className="my-auto mr-4 bg-color-main p-2 rounded-full hover:text-red-500 text-lg"
              >
                <RxCross1 />
              </div>
            </Tooltip>
          </div>
        ) : (
          <div className="flex flex-row cursor-pointer">
            <Tooltip title="Reject" placement="top" className="text-lg">
              <div
                onClick={handleReject}
                className="my-auto mr-4 bg-color-main p-2 rounded-full hover:text-red-500 text-lg"
              >
                <RxCross1 />
              </div>
            </Tooltip>
            <Tooltip title="Accept" placement="top" className="text-lg">
              <div
                onClick={handleAccept}
                className="my-auto mr-4 bg-color-main p-2 rounded-full hover:text-green-400 text-lg"
              >
                <MdOutlineDone />
              </div>
            </Tooltip>
          </div>
        )
      ) : (
        <div className="flex flex-row cursor-pointer">
          <PopoverMenu friendInfo={prompt.friendInfo} />

          <Tooltip title="Message" placement="top" className="text-lg">
            <div className="my-auto mr-4 hover: bg-color-main p-2 rounded-full">
              <FaMessage />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
