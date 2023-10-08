"use client";

import { useState } from "react";

export default function FriendsPage() {
  // Create an array to store the isSelected state for each item
  const [isSelectedList, setIsSelectedList] = useState([
    true,
    false,
    false,
    false,
  ]);

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
    const iconStyle = ` mr-4 font-bold text-md py-1 px-4 rounded-md  
    transition ease-in-out delay-100
    ${
      isSelectedList[index]
        ? "text-white bg-[#515562] hover:bg-[#515562] hover:text-white"
        : "text-gray-300 bg-transparent hover:bg-[#2A2F40] hover:text-slate-50"
    }
      `;
    return iconStyle;
  }

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
    <div className="flex flex-col bg-color-main h-screen w-screen  ">
      <div className="flex flex-col justify-end mt-12 mb-8 ml-8  md:ml-24 ">
        <h1 className="text-left font-bold text-lg md:text-2xl mb-12">
          Friends
        </h1>
        <div
          className=" flex flex-row justify-around ml-0  w-[50%]   h-fit mb-12 max-w-5xl
        "
        >
          {friendBtnList.slice(0, 5).map((item) => (
            <button
              key={`friendBtn-${item.index}`}
              onClick={() => {
                handleItemClick(item.index);
              }}
              className={getIconStyle(item.index)}
            >
              {item.btnName}
            </button>
          ))}

          <button className="mr-4 w-fit font-meduim text-md py-1 px-3 rounded-md   bg-green-700 hover:bg-green-600">
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
}
