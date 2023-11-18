"use client";

import { useEffect, useState } from "react";
import FriendCategory from "./components/FriendCategory";
import { FriendAlert } from "./components/FriendAlert/FriendAlert";

export default function FriendsPage() {
  // Create an array to store the isSelected state for each item
  const [isSelectedList, setIsSelectedList] = useState([
    true,
    false,
    false,
    false,
  ]);

  // this is for the status of the friend items shown (onlin,all...)
  const [itemsStatus, setItemsStatus] = useState("Online");

  let friendBtnList = [
    {
      btnName: "Online",
      index: 0,
    },
    {
      btnName: "All",
      index: 1,
    },
    {
      btnName: "Pending",
      index: 2,
    },
    {
      btnName: "Blocked",
      index: 3,
    },
  ];

  function getIconStyle(index: number) {
    const iconStyle = ` font-bold  py-1 rounded-md  
    transition ease-in-out delay-100
    ${
      isSelectedList[index]
        ? "text-white bg-[#515562] hover:bg-[#515562] hover:text-white"
        : "text-gray-300 bg-transparent hover:bg-[#2A2F40] hover:text-slate-50"
    }

    // small screen
    text-xs px-2 mr-1.5
    // big screen 
    md:text-sm lg:text-md lg:px-4  md:mr-4
    
      `;
    return iconStyle;
  }

  const handleItemClick = (item: { btnName: string; index: number }) => {
    // Create a copy of isSelectedList and toggle the state for the clicked item
    const updatedIsSelectedList = [];
    for (let i = 0; i < isSelectedList.length; i++) {
      updatedIsSelectedList[i] = false;
    }
    updatedIsSelectedList[item.index] = true;
    setItemsStatus(item.btnName);
    setIsSelectedList(updatedIsSelectedList);
  };

  // ================== friend alert ==================

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("emails[1]");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };
  // ================== /friend alert ==================

  return (
    <div className="flex flex-col bg-color-main h-screen w-screen ">
      <div className="flex flex-col justify-end mt-12 mb-8 ml-8  md:ml-24 ">
        <h1 className="text-left font-bold text-lg md:text-2xl mb-12">
          Friends
        </h1>
        {/* this is the head of the FriendPage */}
        <div
          className=" flex flex-row justify-start ml-0  h-fit mb-8 max-w-5xl

          // small screen
          w-[80%]
          // big screen 
          lg:w-[60%]

        "
        >
          {friendBtnList.map((item) => (
            <button
              key={`friendBtn-${item.index}`}
              onClick={() => {
                handleItemClick(item);
              }}
              className={getIconStyle(item.index)}
            >
              {item.btnName}
            </button>
          ))}

          <button
            className="mr-4 w-fit font-meduim  py-1 rounded-md   bg-green-700 hover:bg-green-600
          
         
          // small screen
          text-xs px-2
          // big screen 
          md:text-sm lg:text-md lg:px-4 
          "
            onClick={handleClickOpen}
          >
            Add Friend
          </button>
          <FriendAlert
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
        {/* this is the friend items */}
        <div
          className="flex flex-col  max-w-3xl
        
        // small screen
          w-[80%]
          // big screen 
          lg:w-[60%]
        "
        >
          <FriendCategory itemsStatus={itemsStatus} />
        </div>
      </div>
    </div>
  );
}
