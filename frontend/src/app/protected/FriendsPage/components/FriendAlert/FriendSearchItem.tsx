"use client";
import { sendFriendRequest } from "@/app/MyApi/friendshipApi";
import { useGlobalContext } from "@/app/protected/context/store";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaMessage } from "react-icons/fa6";

export default function FriendSearchItem(prompt: {
  userInfo: friendDto;
  pendingFriendsList: friendDto[];
}) {
  // ================== handle Invite ==================
  const { user, socket } = useGlobalContext();
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setIsPending(
      prompt.pendingFriendsList.some((item) => item.id === prompt.userInfo.id)
    );
  }, [prompt.pendingFriendsList, socket]);
  async function handleInvite(userInfo: friendDto) {
    try {
      await sendFriendRequest(user.id, userInfo.id);
      setIsPending(true);
      socket?.emit("updateData", {
        content: "",
        senderId: user.id,
        isDirectMessage: true,
        receivedId: userInfo.id,
      });
    } catch (error) {
      //console.log("handleInvite: " + error);
    }
  }
  // ================== /handle Invite ==================

  return (
    <div
      className="  flex flex-row justify-between  border-gray-300 bg-white
     hover:border-color-main transition ease-in-out delay-50
     
     py-1 px-1  mx-4 my-1 border-b-1
     sm:py-2 sm:px-2  sm:mx-8 sm:my-2 sm:border-b-2
     lg:py-2 lg:px-2  lg:mx-8 lg:my-2 lg:border-b-2
     
     "
    >
      <Link href={`/protected/DashboardPage/${prompt.userInfo.nickname}`}>
        <div className=" cursor-pointer flex flex-row ">
          <img
            className="object-cover mx-auto  rounded-full 
          
        // small screen
        w-7 h-7
        md:w-10 md:h-10
        // Big screen
        lg:w-12 lg:h-12
        "
            src={prompt.userInfo.profilePic}
            alt=""
          />
          <p
            className="my-auto
        
        text-[0.4rem] mx-1
        md:text-xs md:ml-4 
        lg:text-sm
        "
          >
            {prompt.userInfo.nickname}
          </p>
        </div>
      </Link>
      <div className="flex flex-row ">
        {isPending ? (
          <button
            className="bg-gray-600 rounded-md text-white 
           my-auto  h-fit  cursor-default
          
          text-[0.5rem] mx-2  px-2 py-1
            md:text-xs md:mx-2  md:px-3 
            lg:text-sm
          "
          >
            pending
          </button>
        ) : (
          <button
            onClick={() => {
              handleInvite(prompt.userInfo);
            }}
            className="bg-color-main rounded-md text-white my-auto  h-fit
            
            text-[0.5rem] mx-2  px-2 py-1
            md:text-xs md:mx-2  md:px-3 
            lg:text-sm"
          >
            invite
          </button>
        )}
      </div>
    </div>
  );
}
