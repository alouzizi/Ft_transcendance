"use client";
import {
  getAllUsers,
  getPendingFriends,
  sendFriendRequest,
} from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";
import Link from "next/link";
import React, { useState } from "react";
import { FaMessage } from "react-icons/fa6";

export default function NavSearchItem(prompt: {
  userInfo: friendDto;
  pendingFriendsList: friendDto[];
}) {
  return (
    <div className=" my-2 w-full ">
      <Link href={`/protected/DashboardPage/${prompt.userInfo.username}`}>
        <div className=" cursor-pointer flex flex-row ">
          <img
            className="object-cover ml-8  rounded-full 
          
        // small screen
        w-10 h-10
        // Big screen
        md:w-12 md:h-12
        "
            src={prompt.userInfo.avatar}
            alt=""
          />
          <p
            className="ml-4 my-auto text-color-main-whith
        
        // small screen
        text-xs
        // Big screen
        md:text-sm
        "
          >
            {prompt.userInfo.username}
          </p>
        </div>
      </Link>
    </div>
  );
}
