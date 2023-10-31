"use client";

import { useGlobalContext } from "@/app/context/store";
import { Backend_URL } from "@/lib/Constants";
import { useState, useEffect } from "react";
import FriendItem from "./FriendItem";
import {
  getAllFriends,
  getBlockedFriends,
  getOnlineFriends,
  getPendingFriends,
} from "@/app/api/hixcoder/FriendsPage";

export default function FriendCategory(prompt: { itemsStatus: string }) {
  const [data, setData] = useState<friendDto[]>([]);
  const { user } = useGlobalContext();
  useEffect(() => {
    async function gatData() {
      console.log("prompt.itemsStatus ==> " + prompt.itemsStatus);

      try {
        let dataTmp = [];
        if (prompt.itemsStatus === "Online") {
          dataTmp = await getOnlineFriends(user.id);
        } else if (prompt.itemsStatus === "All") {
          dataTmp = await getAllFriends(user.id);
        } else if (prompt.itemsStatus === "Pending") {
          dataTmp = await getPendingFriends(user.id);
        } else if (prompt.itemsStatus === "Blocked") {
          dataTmp = await getBlockedFriends(user.id);
        } else {
          dataTmp = [];
        }
        setData(dataTmp);
        return data;
      } catch (error: any) {
        console.log("gatData error: " + error);
      }
    }
    console.log(user);
    gatData();
  }, [user.id, prompt.itemsStatus]);
  //   useEffect(() => {}, [data]);

  return (
    <div>
      <p
        className="mr-4 mb-4 w-fit font-bold  py-1 px-3 text-gray-400 
          
          // small screen
          text-sm
          // big screen 
          md:text-md 
          "
      >
        {`${prompt.itemsStatus} - ${data.length}`}
      </p>
      {data.map((element) => (
        <FriendItem
          key={element.id}
          friendImg={element.avatar}
          friendName={element.username}
        />
      ))}
    </div>
  );
}
