"use client";

import {
  getAllPossibleFriends,
  getPendingFriends,
} from "@/app/MyApi/friendshipApi";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import { ImCross } from "react-icons/im";
import FriendSearchItem from "./FriendSearchItem";
import { useGlobalContext } from "@/app/protected/context/store";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export function FriendAlert(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
    setInputSearch("");
    setData([]);
  };
  // ================== fetch users ==================
  const [data, setData] = React.useState<friendDto[]>([]);
  const [PendingFriendsList, setPendingFriendsList] = React.useState<
    friendDto[]
  >([]);
  const { updateInfo, user } = useGlobalContext();
  React.useEffect(() => {
    async function getData() {
      try {
        const AllPossibleFriendsDataTmp: friendDto[] =
          await getAllPossibleFriends(user.id);
        const pendingFriendsListTmp = await getPendingFriends(user.id);
        setPendingFriendsList(pendingFriendsListTmp);
        setData(AllPossibleFriendsDataTmp);
      } catch (error: any) {
        //console.log("Friend alert getData error: " + error);
      }
    }
    getData();
  }, [open, updateInfo]);
  // ================== /fetch users ==================

  // ================== handle search ==================
  const [inputSearch, setInputSearch] = useState("");
  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    setInputSearch(event.target.value);
  }
  const filteredData = data.filter((user) => {
    return (
      user.nickname.toLowerCase().includes(inputSearch.toLowerCase()) &&
      inputSearch !== ""
    );
  });

  // ================== /handle search ==================

  return (
    <Dialog onClose={handleClose} open={open}>
      <div
        className="w-52 h-96 p-2 
      sm:w-96 md:h-[32rem] md:p-4
      "
      >
        <div
          onClick={handleClose}
          className="flex flex-row justify-end mb-2 text-sm md:text-md lg:text-lg"
        >
          <ImCross className="text-gray-400 hover:text-color-main cursor-pointer" />
        </div>
        <p
          className="
          text-sm mb-2 ml-4
          md:text-md md:mb-4
          lg:text-lg
          "
        >
          Add Friends
        </p>

        <input
          type="text"
          name="price"
          className="block  rounded-xl  text-gray-900  bg-[#F1F3F9]  
          ring-1 ring-inset ring-gray-300 placeholder:text-[#666C79] focus:outline-none
          
          text-[0.5rem] sm:text-xs w-[80%] py-2 ml-4 mb-4 pl-4 pr-4
           md:py-3 md:mx-8 md:mb-8 md:pl-7 md:pr-20
          md:text-sm sm:leading-6 
          "
          placeholder="Enter friend username"
          onChange={handleSearch}
        ></input>
        <div className="h-[60%]  mb-8 overflow-y-scroll">
          {filteredData.length !== 0 ? (
            filteredData.map((element) => (
              <FriendSearchItem
                key={element.id}
                userInfo={element}
                pendingFriendsList={PendingFriendsList}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 text-xs md:text-sm ">
              Username not found
            </p>
          )}
        </div>
      </div>
    </Dialog>
  );
}
