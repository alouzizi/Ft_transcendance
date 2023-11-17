"use client";

import {
  getAllPossibleFriends,
  getPendingFriends
} from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/protected/context/store";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import { ImCross } from "react-icons/im";
import FriendSearchItem from "./FriendSearchItem";

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
  const { user } = useGlobalContext();
  React.useEffect(() => {
    async function getData() {
      try {
        const AllPossibleFriendsDataTmp = await getAllPossibleFriends(user.id);
        const pendingFriendsList = await getPendingFriends(user.id);
        setPendingFriendsList(pendingFriendsList);
        setData(AllPossibleFriendsDataTmp);
      } catch (error: any) {
        console.log("Friend alert getData error: " + error);
      }
    }
    getData();
  }, [open]);
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
      <div className="w-fit p-4">
        <div onClick={handleClose} className="flex flex-row justify-end mb-2">
          <ImCross className="text-gray-400 hover:text-color-main cursor-pointer" />
        </div>
        <DialogTitle>Add Friends</DialogTitle>

        <input
          type="text"
          name="price"
          className="block w-96 rounded-xl  py-3 mx-8 mb-8 pl-7 pr-20 text-gray-900  bg-[#F1F3F9]  text-lg
          ring-1 ring-inset ring-gray-300 placeholder:text-[#666C79]
          sm:text-sm sm:leading-6
          focus:outline-none"
          placeholder="Enter friend username"
          onChange={handleSearch}
        ></input>
        <div className="h-96 overflow-auto mb-8 ">
          {filteredData.length !== 0 ? (
            filteredData.map((element) => (
              <FriendSearchItem
                key={element.id}
                userInfo={element}
                pendingFriendsList={PendingFriendsList}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 ">Username not found</p>
          )}
        </div>
      </div>
    </Dialog>
  );
}
