"use client";
import { buttonVariants } from "@/components/ui/button";
import { Text } from "@radix-ui/themes";
import Link from "next/link";

import { ReactNode } from "react";
import { usePathname } from 'next/navigation'

export default function NavBarPublic(prompt: { children: ReactNode }) {
  const pathname = usePathname()



  return (
    <div className="flex flex-col  h-screen  text-white">
      <div className="w-full bg-color-main-dark flex flex-row justify-center py-4">
        <div className="container flex items-center justify-between">

          <Link href="/">
            <img src='/PongMaster.png' />
          </Link>


          <div className="space-x-4">
            <Link
              href="/public/HomePage"
              className={(pathname === "/public/HomePage" || pathname === "/auth") ? "" : "text-gray-600"}>
              <Text weight='bold'> HOME</Text>
            </Link>
            <Link
              href="/public/AboutPage"
              className={pathname === "/public/AboutPage" ? "" : "text-gray-600"}>
              <Text weight='bold'> ABOUT</Text>
            </Link>
            <Link
              href="/public/ContactPage"
              className={pathname === "/public/ContactPage" ? "" : "text-gray-600"}>
              <Text weight='bold'> CONTACT</Text>
            </Link>
          </div>

          <div className="flex flex-row space-x-2">
            <Link
              href="/auth"
              className={buttonVariants({
                variant: "outline",
                className: "text-color-main bg-color-main-whith",
              })}>
              Login
            </Link>
          </div>

        </div>
      </div>
      {prompt.children}
    </div >
  );
}
