"use client";
import Link from "next/link";

export default function SBItems(prompt: {
  pageName: string;
  children: React.ReactNode;
}) {
  const handleClick = () => {
    console.log("hello");
  };
  return (
    <Link
      onClick={handleClick}
      href={`/${prompt.pageName}`}
      className="flex flex-row px-5 mb-6 "
    >
      <hr className="w-1 h-4/5 my-auto  mx-0 rounded-md bg-white shadow-md shadow-white" />
      {prompt.children}
    </Link>
  );
}
