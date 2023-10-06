"use client";
import { GoHomeFill } from "react-icons/go";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import SBSection from "./SBSection";
import SBItems from "./SBItems";
import { useState } from "react";

export default function SideBar() {
  // Create an array to store the isSelected state for each item
  const [isSelectedList, setIsSelectedList] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  function getIconStyle(index: number) {
    const iconStyle = `w-6 h-6 mx-auto transition ease-in-out delay-100 ${
      isSelectedList[index] ? "text-white scale-110" : "text-gray-400"
    }`;
    return iconStyle;
  }
  let sBItemsList = [
    {
      pageName: "HomePage",
      icon: <GoHomeFill className={`${getIconStyle(0)}`} />,
      index: 0,
    },
    {
      pageName: "ChatPage",
      icon: <BsFillChatDotsFill className={`${getIconStyle(1)}`} />,
      index: 1,
    },
    {
      pageName: "FriendsPage",
      icon: <FaUserFriends className={`${getIconStyle(2)}`} />,
      index: 2,
    },
    {
      pageName: "LeaderboardPage",
      icon: <MdLeaderboard className={`${getIconStyle(3)}`} />,
      index: 3,
    },
    {
      pageName: "GamePage",
      icon: <IoGameController className={`${getIconStyle(4)}`} />,
      index: 4,
    },
    {
      pageName: "NotificationPage",
      icon: <IoMdNotifications className={`${getIconStyle(5)}`} />,
      index: 5,
    },
    {
      pageName: "SettingsPage",
      icon: <IoSettingsSharp className={`${getIconStyle(6)}`} />,
      index: 6,
    },
  ];

  const handleItemClick = (index: number) => {
    // Create a copy of isSelectedList and toggle the state for the clicked item
    const updatedIsSelectedList = [];
    for (let i = 0; i < isSelectedList.length; i++) {
      updatedIsSelectedList[i] = false;
    }
    updatedIsSelectedList[index] = true;
    setIsSelectedList(updatedIsSelectedList);
    console.log(updatedIsSelectedList[index]);
  };

  return (
    <div 
    id="SideBar"
    className=" flex flex-col py-8 bg-color-main-dark w-28 h-screen">
     

      <div className=" flex flex-col justify-between h-5/6">
        <SBSection sectionName="Home">
          {sBItemsList.slice(0, 5).map((item) => (
            <SBItems
              key={item.pageName}
              pageName={item.pageName}
              onClick={() => handleItemClick(item.index)}
            >
              {item.icon}
            </SBItems>
          ))}
        </SBSection>

        <SBSection sectionName="Profile">
          {sBItemsList.slice(5, 7).map((item) => (
            <SBItems
              key={item.pageName}
              pageName={item.pageName}
              onClick={() => handleItemClick(item.index)}
            >
              {item.icon}
            </SBItems>
          ))}
        </SBSection>
      </div>

      <img
        className="w-16 h-16 object-cover mx-auto mb-16 rounded-full border-2
         border-color-main shadow-[0px_0px_10px_rgba(0,0,0,0)] shadow-color-main-whith 
         hover:shadow-transparent hover:border-color-main-whith"
        src="profile-img.png"
        alt=""
      />
    </div>
  );
}
