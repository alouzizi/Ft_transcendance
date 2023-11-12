"use client";
import Image from "next/image";
import Link from "next/link";
import { Laugh } from "lucide-react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ReactNode } from "react";

export default function NavBarPublic(prompt: { children: ReactNode }) {
  return (
<<<<<<< HEAD
    <div className="flex flex-col  h-screen">
=======
    <div className="flex flex-col  h-screen  text-white">
>>>>>>> implement the sockets successfully
      <div className="w-full bg-color-main-dark flex flex-row justify-center py-4">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <Laugh size={32} />
          </Link>
          <div className="flex flex-row space-x-2">
            <Link
<<<<<<< HEAD
              href="/api/auth/signin"
=======
              href="/auth"
>>>>>>> implement the sockets successfully
              className={buttonVariants({
                variant: "outline",
                className: "text-color-main bg-color-main-whith",
              })}
            >
              Login
            </Link>
            <Link
              href="/auth/openAccount"
              className={buttonVariants({
                variant: "outline",
                className: "text-color-main bg-color-main-whith",
              })}
            >
              Open account
            </Link>
          </div>
        </div>
      </div>
      {prompt.children}
    </div>
  );
}
