"use client";

import NavBarPublic from "@/components/navBar/NavbarPublic";
<<<<<<< HEAD
import Link from "next/link";
import { ImCross } from "react-icons/im";
=======

>>>>>>> implement the sockets successfully

export default function AuthLayout(prompt: { children: React.ReactNode }) {
  return (
    <NavBarPublic>
      <div className="bg-color-main w-screen h-screen py-16">
        <div className="bg-white p-8 w-[80%] md:[40%] max-w-sm h-fit  m-auto   rounded-md ">
<<<<<<< HEAD
          <div className="flex flex-row justify-end mb-2">
            <Link href={"/"}>
              <ImCross className="text-gray-400 hover:text-color-main" />
            </Link>
          </div>
=======
>>>>>>> implement the sockets successfully
          {prompt.children}
        </div>
      </div>
    </NavBarPublic>
  );
}
