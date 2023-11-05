"use client";
import {
  getAllPossibleFriends,
  getPendingFriends,
} from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";
import { Popper } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import NavSearchItem from "./NavSearchItem";
import Link from "next/link";

export default function SerachNav(prompt: { show: boolean }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

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

  // ================ Search ===============

  const [inputSearch, setInputSearch] = useState("");
  function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
    setInputSearch(event.target.value);
    setAnchorEl(event.currentTarget);

    // handleClick;
  }
  const filteredData = data.filter((user) => {
    return (
      user.username.toLowerCase().includes(inputSearch.toLowerCase()) &&
      inputSearch !== ""
    );
  });

  // ================ /Search ===============

  return (
    <div className="mx-auto flex flex-row w-fit overflow-hidden">
      <FaSearch
        onClick={() => {
          console.log("click search");
        }}
        className="md:ml-8 ml-2 my-auto md:w-7 md:h-7 h-4 w-4 text-color-main-whith cursor-pointer active:text-color-main block"
      />

      <input
        aria-describedby={id}
        onClick={handleClick}
        id={id}
        type="text"
        name="price"
        className={`block  px-6 text-gray-900 my-auto rounded-full bg-[#F1F3F9]  
        md:py-3 md:mx-8 md:pr-20 md:text-md py-2 mx-2 pr-16 text-sm md:w-96 w-52
        placeholder:text-[#666C79] sm:text-sm sm:leading-6 focus:outline-none  ${
          open ? "rounded-b-none rounded-t-3xl" : "rounded-full"
        }`}
        placeholder="Search..."
        onChange={handleSearch}
        onBlur={() => {
          setTimeout(() => {
            setAnchorEl(null);
          }, 200);
        }}
      />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={`flex flex-row mx-auto rounded-b-2xl text-center bg-[#F1F3F9] h-fit  md:w-96 w-52`}
      >
        <div className="h-fit overflow-auto mb-4 w-full">
          {filteredData.length !== 0 ? (
            filteredData
              .slice(0, 4)
              .map((element) => (
                <NavSearchItem
                  key={element.id}
                  userInfo={element}
                  pendingFriendsList={PendingFriendsList}
                />
              ))
          ) : (
            <p className="text-gray-400 text-center w-full">
              Username not found
            </p>
          )}
        </div>
      </Popper>
    </div>
  );
}
