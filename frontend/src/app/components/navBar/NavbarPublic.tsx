"use client";

import AlertOpenAccount from "@/app/public/HomePage/components/alertOpenAcc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

export default function NavBarPublic(prompt: { children: ReactNode }) {
  const pathname = usePathname();
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <div className="flex flex-col  h-screen  text-white ">
      <div className="w-full bg-color-main  flex flex-row justify-center items-center py-4 pt-8">
        <div className="container flex items-center justify-between  ">

          <Link href="/HomePage">
            <img className="h-8" src="/PongMaster.svg" alt="PongMaster" />
          </Link>

          <div className="space-x-4 flex">
            <Link
              href="/HomePage"
              className={
                pathname === "/HomePage"
                  ? ""
                  : "text-gray-400"
              }
            >

              <div> HOME</div>
            </Link>
            <Link
              href="/AboutPage"
              className={
                pathname === "/AboutPage" ? "" : "text-gray-400"
              }
            >
              <div> ABOUT</div>
            </Link>
            <Link
              href="/ContactPage"
              className={
                pathname === "/ContactPage" ? "" : "text-gray-400"}
            >
              <div>CONTACT</div>
            </Link>
          </div>

          <div onClick={(e) => {
            e.preventDefault()
            setOpenAlert(true);
          }} className="bg-[#4069FF] px-4 py-2 rounded-md mt-4 flex items-center cursor-pointer">
            <p className="text-white  pr-2">Open Account</p>
            <FaArrowCircleRight size="20" />
          </div>
        </div>

      </div>
      {prompt.children}


      <AlertOpenAccount openAlert={openAlert} setOpenAlert={setOpenAlert} />

    </div>
  );
}
