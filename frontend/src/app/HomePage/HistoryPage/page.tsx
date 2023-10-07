"use client";

import MyDropDown from "@/components/homePage/MyDropDown";
import { useState } from "react";

export default function HistoryPage() {
  const items = ["banana", "apple", "orange", "pear", "grape", "berry"];
  const [showDropdown, setShowDropdown] = useState(false);

    return (
      <div className="flex flex-col bg-color-main h-screen w-screen pl-32 ">
        <h1 className="text-left">hello GamePage</h1>
        <div className="flex flex-col bg-slate-600">
        <MyDropDown
        showDropdown={showDropdown}
        setShowDropdown={() => setShowDropdown(!showDropdown)}
        items={items}
      />
        </div>
      </div>
    );
  }
  