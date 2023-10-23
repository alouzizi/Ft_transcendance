"use client";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/ ProjectComp/navBar/NavBar";
import { useState } from "react";
import SideBar from "@/components/ ProjectComp/sideBar/SideBar";
import Provider from "./context/client-provider";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <NavBar
            onClick={() => {
              setShow((prev) => !prev);
              console.log(show + " click");
            }}
          />
        </div>
        <div className="flex flex-row w-screen bg-color-main relative">
          <div
            className={`
        absolute  top-0 z-20 
        transition-all duration-300 ease-in-out overflow-hidden
        ${show ? "left-0" : "-left-full"} 
        
        2xl:left-0
        
        `}
          >
            <SideBar />
          </div>
          <div
            className={` w-screen  m-0 bg-color-main
        transition-all duration-300 ease-in-out overflow-hidden
          min-[0px]:pl-0
         ${show ? "md:pl-32" : "md:pl-0"} 
         2xl:pl-20
         `}
          >
            <Provider session={session}>{children}</Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
