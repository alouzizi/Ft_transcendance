"use client";
import Link from "next/link";
import { useState } from "react";

export default function SBItems(prompt: {
  pageName: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/${prompt.pageName}`}
      className="flex flex-row px-5 mb-6 border-4 border-transparent  transition ease-in-out delay-2 hover:border-l-white hover:shadow-md "
    >
      {prompt.children}
    </Link>
  );
}
