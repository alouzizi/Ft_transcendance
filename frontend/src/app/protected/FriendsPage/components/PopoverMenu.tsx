import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGlobalDataContext } from "./FriendCategory";
import { blockFriend, removeFriend } from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";

export default function PopoverMenu(prompt: { friendInfo: friendDto }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // ==================== popover configs =====================

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
  const user = useGlobalContext();

  function handlePlayMatch() {
    console.log("play match with friend: " + prompt.friendInfo.username);
    handleClose();
  }

  async function handleRemoveFriend() {
    try {
      await removeFriend(user.user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
    } catch (error) {
      console.log("handleRemoveFriend: " + error);
    }
    handleClose();
  }

  async function handleBlockFriend() {
    try {
      await blockFriend(user.user.id, prompt.friendInfo.id);
      const updatedData = contxt.data.filter(
        (item) => item.id !== prompt.friendInfo.id
      );
      contxt.setData(updatedData);
    } catch (error) {
      console.log("handleBlockFriend: " + error);
    }
    handleClose();
  }
  // ===================== /handle popover options ===============

  return (
    <div className="my-auto ">
      <button
        aria-describedby={id}
        onClick={handleClick}
        className="my-auto mr-4 bg-color-main p-2 rounded-full"
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
            backgroundColor: "transparent", // Change this to the desired color
          },
        }}
      >
        <div className=" flex flex-col bg-color-main-dark py-2 px-2 rounded-none cursor-pointer">
          <p
            onClick={handlePlayMatch}
            className="text-white text-sm rounded-md ml-0 py-2 pl-2 pr-14
                    
                    hover:bg-color-main-whith  "
          >
            play match
          </p>
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
      </Popover>
    </div>
  );
}
