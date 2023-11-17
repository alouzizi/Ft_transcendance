"use client";
import { FiMenu } from "react-icons/fi";
import SideBar from "./sideBar/SideBar";
import { ReactNode, useState } from "react";
<<<<<<< HEAD
=======
import { FaSearch } from "react-icons/fa";
import { Popper } from "@mui/material";
import SerachNav from "./search/NavSearch";
>>>>>>> origin/lhoussin
export default function NavBarProtected(prompt: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  return (
<<<<<<< HEAD
    <div className="flex flex-col h-screen">
      <div className=" flex flex-row justify-items-start h-20 bg-color-main-dark z-30">
        <div className="w-28 h-full  flex flex-col justify-center ">
          <img className="h-3/4 m-auto" src="/logo.png" alt="" />
        </div>
        <div className="flex flex-row justify-center p-2">
          <div
            onClick={() => {
              setShow((prev) => !prev);
            }}
            className="my-auto "
          >
            <FiMenu
              className="my-auto w-8 h-8 text-gray-400 cursor-pointer
        hover:text-white 
        
        // small screen
       block
        // Big screen
        2xl:hidden
        "
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row h-full w-screen bg-color-main relative">
        <div
          className={`
       absolute  top-0 z-20 
       transition-all duration-300 ease-in-out overflow-hidden
       ${show ? "left-0" : "-left-full"} 
       
       2xl:left-0
       
       `}
=======
    <div className="flex flex-col h-screen  text-white">
      {/* ================== NAV BAR ================== */}
      <div className={`md:h-20 h-16  bg-color-main-dark z-1 w-screen`}>
        <div
          className={` flex flex-row justify-items-start  my-auto  md:h-20 h-16  w-full bg-color-main-dark z-30  ${show ? " pl-28" : ""
            }
          transition-all duration-300 ease-in-out 
        `}
        >
          <FiMenu
            onClick={() => {
              setShow((prev) => !prev);
            }}
            className={`${show ? "ml-4" : "ml-12"
              }  transition-all duration-300 ease-in-out  my-auto md:w-8 md:h-8 h-7 w-7 text-gray-400 cursor-pointer  hover:text-white  block 2xl:hidden `}
          />

          <SerachNav show={show} />
        </div>
      </div>
      {/* ================== /NAV BAR ================== */}
      {/* ================== SIDE BAR ================== */}
      <div className="flex flex-row w-screen bg-color-main relative">
        <div
          className={`absolute  top-0 z-20 transition-all duration-300 ease-in-out overflow-hidden
          ${show ? "left-0" : "-left-full"} 
          2xl:left-0
          `}
>>>>>>> origin/lhoussin
        >
          <SideBar />
        </div>
        <div
<<<<<<< HEAD
          className={`flex justify-center items-center w-screen  m-0 bg-color-main
       transition-all duration-300 ease-in-out overflow-hidden
         min-[0px]:pl-0
        ${show ? "md:pl-32" : "md:pl-0"} 
        2xl:pl-20
=======
          className={` w-screen  m-0 bg-color-main transition-all duration-300 ease-in-out overflow-hidden min-[0px]:pl-0
          ${show ? "md:pl-32" : "md:pl-0"} 
          2xl:pl-20
>>>>>>> origin/lhoussin
        `}
        >
          {prompt.children}
        </div>
      </div>
<<<<<<< HEAD
=======
      {/* ================== /SIDE BAR ================== */}
>>>>>>> origin/lhoussin
    </div>
  );
}
