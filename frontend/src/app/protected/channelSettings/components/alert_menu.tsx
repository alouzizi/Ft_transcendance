"use client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import {
  ChangeStatusBanned,
  cancelTimeOut,
  changeStatusAdmin,
  kickMember,
  muteUserChannel,
} from "../../ChatPage/api/fetch-channel";
import { Text } from "@radix-ui/themes";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { z } from "zod";
import { useGlobalContext } from "../../context/store";

const ITEM_HEIGHT = 48;

export default function LongMenu({
  member,
  banned,
  setUpdate,
}: {
  member: memberChannelDto;
  banned: boolean;
  setUpdate: any

}) {
  const allOptions = {
    reguler: [
      member.role.includes("Admin") ? "Remove Group Admin" : "Make Group Admin",
      "kick from Group",
      "ban from Group",
      member.unmuted_at === 0 ? "Timeout" : "Cancel Timeout",
    ],
    banned: ["unban from Group"],
  };

  const [options, setOptions] = React.useState<string[]>([]);
  const { geust, user, socket, updateInfo } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    if (banned) setOptions(allOptions["banned"]);
    else setOptions(allOptions["reguler"]);
    return () => {
      setOptions([]);
    };
  }, [geust.lastSee, open, updateInfo]);

  React.useEffect(() => {
    setAnchorEl(null);
  }, [updateInfo]);

  const handleClose = async (e: any) => {
    if (typeof e === "string") {
      if ("Make Group Admin" === e || "Remove Group Admin" === e) {
        await changeStatusAdmin(user.id, geust.id, member.userId);
      } else if ("ban from Group" === e || "unban from Group" === e) {
        await ChangeStatusBanned(user.id, geust.id, member.userId);

      } else if ("kick from Group" === e) {
        await kickMember(user.id, geust.id, member.userId);

      } else if ("Cancel Timeout" === e) {
        await cancelTimeOut(user.id, geust.id, member.userId);
        socket?.emit("mutedUserInChannel", geust.id);
      } else if ("Timeout" === e) {
        setOpenTimeout(true);
      }
      setUpdate((pre: number) => pre + 1)
    }
    setAnchorEl(null);
  };

  const [showInput, setShowInput] = useState(false);

  const [timerInput, setTimerInput] = useState<string>("");
  const [errorInput, setErrorInput] = useState<string>("");
  const timerSchema = z.string().refine((timer) => /^[1-9][0-9]*$/.test(timer));

  const [openTimeout, setOpenTimeout] = useState(false);
  const [timeSelected, setTimeSelected] = useState(0);
  const timeout: string[] = [
    "60 SECS",
    "5 MINS",
    "10 MINS",
    "1 HOUR",
    "1 DAY",
    "1 WEEK",
  ];
  const timeInSecond: string[] = [
    "60000",
    "300000",
    "600000",
    "3600000",
    "86400000",
    "604800000",
  ];

  return (
    <div>
      <div onClick={handleClick}>
        {" "}
        <MoreVertIcon />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option, index) => (
          <div key={index}>
            <MenuItem
              sx={{ fontSize: 16 }}
              key={index}
              onClick={() => {
                handleClose(option);
              }}
            >
              {option}
            </MenuItem>
          </div>
        ))}
      </Menu>

      <div>
        <Dialog open={openTimeout}>
          <DialogContent style={{ padding: 0, margin: 0 }} className="">
            <div className="flex items-center justify-between px-[10px] pt-2 pb-3">
              <Text className="text-xl">Timeout {member.nickname}</Text>
              <MdOutlineCancel
                className="cursor-pointer"
                onClick={() => {
                  setOpenTimeout(false);
                }}
              />
            </div>

            <div className="flex flex-grow items-center justify-center px-[10px] w-[22rem]">
              <Text as="div" className="text-sm">
                Members who are in time-out are temporarily not allowed to chat
                or react in text channels.
              </Text>
            </div>
          </DialogContent>
          <DialogContent
            className="flex flex-col w-[25rem]"
            style={{ padding: 10, margin: 0 }}
          >
            <div className="flex items-center pb-2">
              <Text className="text-lg">Duration</Text>

            </div>
            <div className="flex justify-center">
              {
                timeout.map((tm: string, index: number) => (
                  <Text
                    key={index}
                    className={`border border-black text-[12px] p-1 cursor-pointer mx-1 
                                    ${index === timeSelected
                        ? "bg-[#4069FF] text-white"
                        : ""
                      }`}
                    onClick={() => {
                      setTimeSelected(index);
                    }}
                  >
                    {tm}
                  </Text>
                ))
              }
            </div>
          </DialogContent>
          <DialogActions className="  bg-gray-300 mt-3">
            <button
              onClick={() => {
                setOpenTimeout(false);
              }}
              className="w-fit font-meduim py-1 rounded-md text-white  text-xs px-2
                        md:text-sm lg:text-md hover:underline underline-offset-3"
            >
              Cancel
            </button>

            <button
              className="w-fit font-meduim  py-1 rounded-md text-white bg-[#4069FF]
            text-xs  
                md:text-sm lg:text-md px-2"
              onClick={async () => {
                await muteUserChannel(
                  user.id,
                  geust.id,
                  member.userId,
                  timeInSecond[timeSelected]
                );
                setOpenTimeout(false);
                socket?.emit("mutedUserInChannel", geust.id);
                // setUpdate((pre: number) => pre + 1)
              }}

            >
              Time-out
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
