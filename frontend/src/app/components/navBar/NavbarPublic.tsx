"use client";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

export default function NavBarPublic(prompt: { children: ReactNode }) {
  const pathname = usePathname();

  const handleLogin = () => {
    window.location.href = "http://10.11.8.5:4000/auth/login42";
  };

  const [openAlert, setOpenAlert] = useState(false);


  return (
    <div className="flex flex-col  h-screen  text-white ">
      <div className="w-full bg-color-main  flex flex-row justify-center items-center py-4 pt-8">
        <div className="container flex items-center justify-between  ">

          <Link href="/public/HomePage">
            <img className="h-8" src="/PongMaster.svg" alt="PongMaster" />
          </Link>

          <div className="space-x-4">
            <Link
              href="/public/HomePage"
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
                pathname === "/public/ContactPage" ? "" : "text-gray-400"}
            >
              <text>CONTACT</text>
            </Link>
          </div>

          <button onClick={(e) => {
            e.preventDefault()
            setOpenAlert(true)
          }} className="bg-[#4069FF] px-4 py-2 rounded-md   flex items-center">
            <text className="text-white font-outfit pr-2">Open Account</text>
            <FaArrowCircleRight size="20" />
          </button>
        </div>

      </div>
      {prompt.children}


      <div>
        <Dialog open={openAlert}
          onClose={() => setOpenAlert(false)}>
          <DialogContent className='flex flex-col items-center p-10 justify-around  bg-[#7D7676] '>


            <img className="h-20" src="/PongMaster.svg" alt="PongMaster" />


            <text className='text-white text-xl'>open account using</text>

            <Button onClick={handleLogin}>
              <div className="border-2 shadow-xl bg-white border-[#4069FF] mt-3 rounded-xl flex justify-center mx-auto items-center w-36 h-12">
                <img className="w-[29px]" src="/42.svg" />
                <p className="ml-1"> school </p>
              </div>
            </Button>

          </DialogContent>
        </Dialog>
      </div>


    </div>
  );
}
