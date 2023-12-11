"use client";
import { FaMessage } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  unblockFriend,
  unsendFriendRequest,
} from "@/app/MyApi/friendshipApi";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import { BiUserX } from "react-icons/bi";
import { MdOutlineDone } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useGlobalDataContext } from "./FriendCategory";
import PopoverMenu from "./PopoverMenu";
import { useGlobalContext } from "../../context/store";
import { getUserGeust } from "../../ChatPage/api/fetch-users";
export default function FriendItem(prompt: {
  friendInfo: friendDto;
  itemsStatus: string;
}) {
  // ==================== handleUnblock =====================
  const { user, socket, setGeust } = useGlobalContext();
  const contxt = useGlobalDataContext();
  const router = useRouter();
  async function handleUnblock(): Promise<void> {
    try {
      await unblockFriend(user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
      socket?.emit("updateData", {
        content: "",
        senderId: user.id,
        isDirectMessage: true,
        receivedId: prompt.friendInfo.id,
      });
    } catch (error) {
      //console.log("handleBlockFriend: " + error);
    }
  }
  // ==================== /handleUnblock =====================

  // ==================== handleReject =====================
  async function handleReject(): Promise<void> {
    try {
      await rejectFriendRequest(user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
      socket?.emit("updateData", {
        content: "",
        senderId: user.id,
        isDirectMessage: true,
        receivedId: prompt.friendInfo.id,
      });
    } catch (error) {
      //console.log("handleReject: " + error);
    }
  }
  // ==================== /handleReject =====================

  // ==================== handleAccept =====================
  async function handleAccept(): Promise<void> {
    try {
      await acceptFriendRequest(user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
      socket?.emit("updateData", {
        content: "",
        senderId: user.id,
        isDirectMessage: true,
        receivedId: prompt.friendInfo.id,
      });
    } catch (error) {
      //console.log("handleAccept: " + error);
    }
  }
  // ==================== /handleAccept =====================

  // ==================== handleCancel =====================
  async function handleCancel(): Promise<void> {
    try {
      await unsendFriendRequest(user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
      socket?.emit("updateData", {
        content: "",
        senderId: user.id,
        isDirectMessage: true,
        receivedId: prompt.friendInfo.id,
      });
    } catch (error) {
      //console.log("handleCancel: " + error);
    }
  }
  // ==================== /handleCancel =====================
  return (
    <div className=" my-2  flex flex-row justify-between bg-[#2A2F40] hover:bg-[#515562] py-2 px-4 rounded-lg">
      <Link href={`/protected/DashboardPage/${prompt.friendInfo.nickname}`}>
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
              src={prompt.friendInfo.profilePic}
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
            {prompt.friendInfo.nickname}
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
                className="my-auto  bg-color-main  rounded-full hover:text-green-400 
                text-md p-1 mr-2
                md:text-lg md:p-2 md:mr-4"
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
            <div
              className="my-auto hover: bg-color-main  rounded-full
            
            text-md p-1 mr-2
                md:text-lg md:p-2 md:mr-4"
            >
              <FaMessage
                onClick={async () => {
                  const geustTemp: geustDto = await getUserGeust(
                    prompt.friendInfo.id
                  );
                  setGeust(geustTemp);
                  router.push("/protected/ChatPage");
                }}
              />
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
