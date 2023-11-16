"use client";
import Image from "next/image";
import Link from "next/link";
import { Laugh } from "lucide-react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/app/components/ui/button";
import { ReactNode } from "react";

export default function NavBarPublic(prompt: { children: ReactNode }) {
  return (
    <div className="flex flex-col  h-screen  text-white">
      <div className="w-full bg-color-main  flex flex-row justify-center py-4 pt-8">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img className="h-8" src="PongMaster.svg" alt="PongMaster" />
          </Link>
          <div className="flex flex-row justify-center space-x-8">
            <Link href="/public/HomePage">
              <p className="text-gray-400 font-700 focus:text-white">Home</p>
            </Link>
            <Link href="/public/AboutPage">
              <p className="text-gray-400 font-700 focus:text-white">About</p>
            </Link>
            <Link href="/public/ContactPage">
              <p className="text-gray-400 font-700 focus:text-white">Contact</p>
            </Link>
          </div>
          <div className="flex flex-row space-x-2">
            <Link href="/auth">
              <p className="text-gray-400 font-700 focus:text-white">Login</p>
            </Link>
          </div>
        </div>
      </div>
      {prompt.children}
    </div>
  );
}
