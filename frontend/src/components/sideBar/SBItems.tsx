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
      className="flex flex-row px-5 mb-6 border-4 border-transparent   
      hover:border-l-white hover:shadow-md 
      "
    >
      {prompt.children}
    </Link>
  );
}
