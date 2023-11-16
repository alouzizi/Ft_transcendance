"use client";
import Link from "next/link";
import { useState } from "react";

export default function SBItems(prompt: {
  pageName: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      onClick={prompt.onClick}
      href={`/${prompt.pageName}`}
      className="flex flex-row border-4 border-transparent   
      hover:border-l-white hover:shadow-md 

      px-3 mb-2
      sm:px-5 sm:mb-6
      "
    >
      {prompt.children}
    </Link>
  );
}
