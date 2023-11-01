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
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function MyDropDown(prompt: { items: string[] }) {
  const [position, setPosition] = React.useState("All");

  return (
    <div className="flex flex-col justify-center items-center mb-12">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row justify-between w-fit bg-white text-color-main rounded-md py-1 px-4 cursor-pointer">
            <p className="text-md ">{position}</p>
            <IoIosArrowDropdownCircle
              className=" my-auto ml-2 text-color-main "
              size={18}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            {prompt.items.map((item) => (
              <DropdownMenuRadioItem key={item} value={`${item}`}>
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
