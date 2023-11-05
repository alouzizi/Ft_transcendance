"use client";
import {
  getAllUsers,
  getPendingFriends,
  sendFriendRequest,
} from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaMessage } from "react-icons/fa6";

export default function NavSearchItem(prompt: {
  userInfo: friendDto;
  pendingFriendsList: friendDto[];
}) {
  const router = useRouter();
  return (
    <div className="  w-full ">
      <Link href={`/protected/DashboardPage/${prompt.userInfo.username}`}>
        <div className=" cursor-pointer flex flex-row hover:bg-blue-100 py-1">
          <img
            className="object-cover ml-8  rounded-full 
          
        // small screen
        w-8 h-8
        // Big screen
        md:w-10 md:h-10
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
