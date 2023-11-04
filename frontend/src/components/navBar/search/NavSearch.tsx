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
    <div
      aria-describedby={id}
      onClick={handleClick}
      className={` flex flex-row  max-w-2xl 2xl:mx-auto bg-[#F1F3F9]  h-fit my-auto ${
        prompt.show ? "ml-4 w-2/4" : "ml-6 w-2/3"
      }
      ${open ? "rounded-t-3xl" : "rounded-full"}`}
    >
      <input
        id={id}
        type="text"
        name="price"
        className={`block w-full text-gray-900  my-auto rounded-full bg-[#F1F3F9] truncate
        md:py-3 md:mx-8  md:pr-20 md:text-md 
        py-2 mx-2  pr-16 text-sm
    placeholder:text-[#666C79] sm:text-sm sm:leading-6 focus:outline-none `}
        placeholder="Search..."
        onChange={handleSearch}
        onBlur={() => setAnchorEl(null)}
      />
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={` flex flex-row  max-w-2xl 2xl:mx-auto rounded-b-2xl text-center bg-[#F1F3F9] h-fit ${
          prompt.show ? "w-2/4" : "w-2/3"
        } `}
      >
        <div className="h-fit overflow-auto mb-4 w-full ">
          {filteredData.length !== 0 ? (
            filteredData.map((element) => (
              <NavSearchItem
                key={element.id}
                userInfo={element}
                pendingFriendsList={PendingFriendsList}
              />
            ))
          ) : (
            <p className=" text-gray-400 text-center w-full ">
              Username not found
            </p>
          )}
        </div>
      </Popper>
    </div>
  );
}
