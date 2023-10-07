"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function MyDropDown(prompt: {
  showDropdown: boolean;
  setShowDropdown: () => void;
  items: string[];
}) {
  const [position, setPosition] = React.useState("bottom");
  const toggleIcon = ()=>{
        console.log("hhhhh")
  }

  return (
    <div    className="flex flex-col justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div onClick={()=>{console.log("hhhhhh")}} className="flex flex-row justify-between w-fit bg-white text-black rounded-md py-1 px-4 cursor-pointer">
            <p className="text-md ">All</p>
            <IoIosArrowDropdownCircle className=" my-auto ml-2" size={18} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
