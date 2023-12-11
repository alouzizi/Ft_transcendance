import * as React from "react";
import Popover from "@mui/material/Popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  blockFriend,
  removeFriend,
  sendFriendRequest,
} from "@/app/MyApi/friendshipApi";
import { useGlobalDataContext } from "../../FriendsPage/components/FriendCategory";
import { useGlobalContext } from "../../context/store";
import PlayInvite from "../../GamePage/components/Invite";

export default function PopoverMenuDash(prompt: {
  friendInfo: ownerDto;
  user: ownerDto;
  isFriend: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // ==================== popover configs =====================
  const { socket } = useGlobalContext();
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // ==================== /popover configs =====================

  // ===================== handle popover options ==============
  const contxt = useGlobalDataContext();

  function handlePlayMatch() {
    //console.log("owner=", prompt.user.id);
    //console.log("invtedd=", prompt.friendInfo.id);
    PlayInvite({
      userId1: prompt.user.id,
      userId2: prompt.friendInfo.id,

      socket: socket,
      nameInveted: prompt.user.nickname,
    });
    handleClose();
  }

  async function handleRemoveFriend() {
    try {
      await removeFriend(prompt.user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
      socket?.emit("updateData", {
        content: "",
        senderId: prompt.user.id,
        isDirectMessage: true,
        receivedId: prompt.friendInfo.id,
      });
    } catch (error) {
      //console.log("handleRemoveFriend: " + error);
    }
    handleClose();
  }

  async function handleBlockFriend() {
    try {
      await blockFriend(prompt.user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
      socket?.emit("blockUserToUser", {
        senderId: prompt.user.id,
        receivedId: prompt.friendInfo.id,
      });
      socket?.emit("updateData", {
        content: "",
        senderId: prompt.user.id,
        isDirectMessage: true,
        receivedId: prompt.friendInfo.id,
      });
    } catch (error) {
      //console.log("handleBlockFriend: " + error);
    }
    handleClose();
  }

  async function handleInvite() {
    try {
      await sendFriendRequest(prompt.user.id, prompt.friendInfo.id);
      socket?.emit("updateData", {
        content: "",
        senderId: prompt.user.id,
        isDirectMessage: true,
        receivedId: prompt.friendInfo.id,
      });
    } catch (error) {
      //console.log("handleInvite: " + error);
    }
    handleClose();
    // //console.log("handleInvite: " + userInfo.username);
  }
  // ===================== /handle popover options ===============

  return (
    <div className="my-auto absolute top-4 right-0">
      <button
        aria-describedby={id}
        onClick={handleClick}
        className="my-auto mr-4 bg-color-main p-2 rounded-full text-lg"
      >
        <BsThreeDotsVertical />
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          ".MuiPaper-root": {
            margin: "8px 0",
            backgroundColor: "transparent", // Change this to the desired color
          },
        }}
      >
        <div className=" flex flex-col bg-color-main-dark py-2 px-2 rounded-none cursor-pointer">
          {!prompt.friendInfo.inGaming ? (
            <p
              onClick={handlePlayMatch}
              className="text-white text-sm rounded-md ml-0 py-2 pl-2 pr-14
                    
                    hover:bg-color-main-whith  "
            >
              Play match
            </p>
          ) : (
            <div />
          )}
          {prompt.isFriend ? (
            <div>
              <p
                onClick={handleRemoveFriend}
                className="text-red-500 text-sm rounded-md ml-0 py-2 pl-2 pr-14
                    
                    hover:bg-red-500 hover:text-white "
              >
                Remove friend
              </p>
              <p
                onClick={handleBlockFriend}
                className="text-red-500 text-sm rounded-md ml-0 py-2 pl-2 pr-14
                    
                    hover:bg-red-500 hover:text-white "
              >
                Block friend
              </p>
            </div>
          ) : (
            <p
              onClick={handleInvite}
              className="text-white text-sm rounded-md ml-0 py-2 pl-2 pr-14
                    
                    hover:bg-color-main-whith hover:text-white "
            >
              Invite friend
            </p>
          )}
        </div>
      </Popover>
    </div>
  );
}
