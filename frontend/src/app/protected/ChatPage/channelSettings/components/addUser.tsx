"use client";
import { useGlobalContext } from "@/app/protected/context/store";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Avatar, Box, Flex, ScrollArea, Text } from "@radix-ui/themes";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { IoCloseOutline, IoSearch } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
import {
  addUserToChannel,
  checkOwnerIsAdmin,
  getChannel,
} from "../../api/fetch-channel";
import { usersCanJoinChannel } from "../../api/fetch-users";

export default function AlertsAddUserChannel() {
  const [open, setOpen] = React.useState(false);
  const [searsh, setSearsh] = useState("");
  const [valideUsers, setValideUsers] = useState<userDto[]>([]);
  const [usersFilter, setUsersFilter] = useState<userDto[]>([]);
  const { user, geust, socket, updateInfo } = useGlobalContext();

  const [channel, setChannel] = useState<channelDto>();

  useEffect(() => {
    const getData = async () => {
      const tmp: channelDto = await getChannel(user.id, geust.id);
      setChannel(tmp);
    };
    if (geust.id !== "-1" && !geust.isUser) getData();
  }, [updateInfo]);

  const [clicked, setClicked] = useState<number>(0);

  const handleClickOpen = () => {
    if (isOwnerAdmin || !channel?.protected) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getData() {
      if (user.id !== "-1") {
        const temp = await usersCanJoinChannel(user.id, geust.id);
        setValideUsers(temp);
      }
    }
    getData();
    setClicked((pre) => pre++);
  }, [open, updateInfo, user.id]);

  useEffect(() => {
    const tmp: userDto[] = valideUsers.filter((elm) => {
      const username = elm.nickname;
      return (username.includes(searsh) && searsh != "") || searsh === "*";
    });
    setUsersFilter(tmp);
  }, [searsh, valideUsers]);

  const [isOwnerAdmin, setIsOwnerAdmin] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const tmp: boolean = await checkOwnerIsAdmin(user.id, geust.id);
      setIsOwnerAdmin(tmp);
    };
    if (geust.id !== "-1" && user.id !== "-1" && !geust.isUser) getData();
  }, [updateInfo]);

  const widgetItem =
    usersFilter.length !== 0 ? (
      usersFilter.map((elm, index) => {
        return (
          <Box p="1" pr="3" key={index}>
            <Flex align="center" justify="between" className="py-2">
              <div className="flex items-center relative">
                <Avatar
                  src={elm.profilePic}
                  fallback="T"
                  style={{ height: "35px", borderRadius: "35px" }}
                />

                <Text size="2" weight="medium" className="pl-2">
                  {elm.nickname}
                </Text>
              </div>

              <div
                className="border px-3 border-[#1f3175] cursor-pointer"
                onClick={
                  async () => {
                    await addUserToChannel(user.id, geust.id, elm.id);
                    setSearsh("");
                    socket?.emit('emitNewMessage', {
                      senderId: user.id,
                      receivedId: geust.id,
                      isDirectMessage: false
                    });
                    socket?.emit('changeStatusMember', geust.id);
                    handleClose();
                  }}>
                <Text size="2" weight="medium">
                  Add
                </Text>
              </div>
            </Flex>
          </Box >
        );
      })
    ) : searsh === "" ? (
      <div></div>
    ) : (
      <div className="flex items-center justify-center">pas user</div>
    );

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="w-fit font-meduim  py-1 rounded-md   text-white bg-green-700 hover:bg-green-600
                            text-xs px-2
                            md:text-sm lg:text-md lg:px-4"
      >
        Add User
      </button>

      <Dialog open={open} keepMounted onClose={handleClose}>
        <div className="flex justify-between  bg-gray-100 pr-2 pt-2 pl-2">
          <Text size="2" weight="medium" className="pl-2  ">
            Add friends to {channel?.channelName}
          </Text>
          <IoCloseOutline
            onClick={() => setOpen(false)}
            size="25"
            className="cursor-pointer"
          />
        </div>
        <DialogContent
          className=" w-[20rem] h-[10rem] items-center justify-center bg-gray-100
                 md:w-[30rem] 
                 md:h-[20rem]
                "
        >
          <div className="flex bg-[#F6F7FA]  border rounded-[10px]  w-[100%]">
            <input
              className="bg-[#F6F7FA] m-1 p-1 flex flex-grow  w-[100%]
                        text-black placeholder-gray-600 text-sm outline-none"
              type="text"
              placeholder="Search for friends"
              value={searsh}
              onChange={(e) => {
                setSearsh(e.target.value);
              }}
            ></input>
            <div className="cursor-pointer flex items-center pr-2">
              <IoSearch size={18} color="black" />
            </div>
          </div>

          <ScrollArea
            type="always"
            scrollbars="vertical"
            style={{ height: "15rem" }}
          >
            {widgetItem}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
