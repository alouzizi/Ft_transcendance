"use client";
import Image from "next/image";
import Link from "next/link";
import { Laugh } from "lucide-react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/app/components/ui/button";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function NavBarPublic(prompt: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col  h-screen  text-white">
      <div className="w-full bg-color-main  flex flex-row justify-center py-4 pt-8">
        <div className="container flex items-center justify-between">
          <Link href="/auth">
            <img className="h-8" src="/PongMaster.svg" alt="PongMaster" />
          </Link>

          <div className="space-x-4">
            <Link
              href="/auth"
              className={
                pathname === "/public/HomePage" || pathname === "/auth"
                  ? ""
                  : "text-gray-400"
              }
            >
              <text> HOME</text>
            </Link>
            <Link
              href="/public/AboutPage"
              className={
                pathname === "/public/AboutPage" ? "" : "text-gray-400"
              }
            >
              <text> ABOUT</text>
            </Link>
            <Link
              href="/public/ContactPage"
              className={
                pathname === "/public/ContactPage" ? "" : "text-gray-400"
              }
            >
              <text>CONTACT</text>
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
