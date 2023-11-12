"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

export default function NavSearchItem(prompt: {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  userInfo: friendDto;
  pendingFriendsList: friendDto[];
}) {
  return (
    <div
      onClick={prompt.onClick}
      className="  w-full cursor-pointer flex flex-row hover:bg-blue-100 py-1"
    >
      <img
        className="object-cover ml-8  rounded-full 
          
        // small screen
        w-8 h-8
        // Big screen
        md:w-10 md:h-10
        "
<<<<<<< HEAD
        src={prompt.userInfo.avatar}
=======
        src={prompt.userInfo.profilePic}
>>>>>>> implement the sockets successfully
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
<<<<<<< HEAD
        {prompt.userInfo.username}
=======
        {prompt.userInfo.nickname}
>>>>>>> implement the sockets successfully
      </p>
    </div>
  );
}
