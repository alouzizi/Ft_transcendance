"use client";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "../components/sideBar/SideBar";
import NavBar from "@/components/navBar/NavBar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const[show, setShow] = useState(false)
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
        <NavBar onClick={()=>{
          
          setShow((prev) => !prev)
          console.log(show + " click")
          }}/>
        </div>
        <div className="flex flex-row w-screen bg-color-main relative">
        <div className={`absolute  top-0 z-20
        transition-all duration-300 ease-in-out overflow-hidden
        ${show ? "left-0" : "-left-full"}`}
        
        >
        <SideBar />
        </div>
        <div className={` w-screen  m-0 bg-color-main
        transition-all duration-300 ease-in-out overflow-hidden
         ${show ? "pl-32" : "pl-0"} `}>{children}</div>
        </div>
      </body>
    </html>
  );
}
