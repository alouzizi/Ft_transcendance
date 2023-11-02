"use client";
import {
  getAllUsers,
  getPendingFriends,
  sendFriendRequest,
} from "@/app/api/hixcoder/FriendsPageAPI";
import { useGlobalContext } from "@/app/context/store";
import React, { useState } from "react";
import { FaMessage } from "react-icons/fa6";

export default function FriendSearchItem(prompt: {
  userInfo: friendDto;
  pendingFriendsList: friendDto[];
}) {
  // // ================== fetch users ==================
  // const [requestFriendsList, setRequestFriendsList] = React.useState<
  //   friendDto[]
  // >([]);
  // const { user } = useGlobalContext();
  // React.useEffect(() => {
  //   async function getData() {
  //     try {
  //       let dataTmp = [];

  //       dataTmp = await getPendingFriends(user.id);
  //       // console.log(dataTmp);
  //       setRequestFriendsList(dataTmp);
  //     } catch (error: any) {
  //       console.log("Friend alert getData error: " + error);
  //     }
  //   }
  //   getData();
  // }, [requestFriendsList]);
  // // ================== /fetch users ==================

  // ================== handle Invite ==================

  // const isPending2= prompt.pendingFriendsList.some
  const user = useGlobalContext();
  const [isPending, setIsPending] = useState(
    prompt.pendingFriendsList.some((item) => item.id === prompt.userInfo.id)
  );
  async function handleInvite(userInfo: friendDto) {
    try {
      await sendFriendRequest(user.user.id, userInfo.id);
      setIsPending(true);
      // const updatedData = contxt.data.filter(
      //   (item) => item.id !== prompt.friendInfo.id
      // );
      // contxt.setData(updatedData);
    } catch (error) {
      console.log("handleInvite: " + error);
    }
    // console.log("handleInvite: " + userInfo.username);
  }
  // ================== /handle Invite ==================

  return (
    <div
      className=" my-2  flex flex-row justify-between border-b-2 border-gray-300 bg-white
     hover:border-color-main transition ease-in-out delay-50 py-2 px-2  mx-8"
    >
      <div className=" cursor-pointer flex flex-row ">
        <img
          className="object-cover mx-auto  rounded-full 
          
        // small screen
        w-10 h-10
        // Big screen
        md:w-12 md:h-12
        "
          src={prompt.userInfo.avatar}
          alt=""
        />
        <p
          className="ml-4 my-auto
        
        // small screen
        text-xs
        // Big screen
        md:text-sm
        "
        >
          {prompt.userInfo.username}
        </p>
      </div>
      <div className="flex flex-row ">
        {isPending ? (
          <button className="bg-gray-600 rounded-md text-white px-3 py-1 my-auto mx-2 h-fit text-xs cursor-default">
            pending
          </button>
        ) : (
          <button
            onClick={() => {
              handleInvite(prompt.userInfo);
            }}
            className="bg-color-main rounded-md text-white px-3 py-1 my-auto mx-2 h-fit text-xs "
          >
            invite
          </button>
        )}
        <div className=" cursor-pointer my-auto mr-2 hover: bg-color-main text-white p-2 rounded-full">
          <FaMessage />
        </div>
      </div>
    </div>
  );
}
