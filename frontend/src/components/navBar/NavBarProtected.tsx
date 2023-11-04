"use client";
import { FiMenu } from "react-icons/fi";
import SideBar from "./sideBar/SideBar";
import { ReactNode, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Popper } from "@mui/material";
import SerachNav from "./search/NavSearch";
export default function NavBarProtected(prompt: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  // ================ Search ===============
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popper" : undefined;
  // ================ /Search ===============
  return (
    <div className="flex flex-col h-screen">
      <div className={` md:h-20 h-16 w-full bg-color-main-dark z-1`}>
        <div
          className={` flex flex-row justify-items-start  my-auto  md:h-20 h-16  w-full bg-color-main-dark z-30  ${
            show ? " ml-28" : ""
          }
          transition-all duration-300 ease-in-out 
        `}
        >
          <FiMenu
            onClick={() => {
              setShow((prev) => !prev);
            }}
            className={`${
              show ? "ml-4" : "ml-12"
            }  transition-all duration-300 ease-in-out  my-auto md:w-8 md:h-8 h-7 w-7 text-gray-400 cursor-pointer  hover:text-white  block 2xl:hidden `}
          />

          {/* ======================== Search =================== */}
          {/* <div 
            // aria-describedby={id}
            // onClick={handleClick}
          //   className={` flex flex-row  max-w-2xl 2xl:mx-auto bg-[#F1F3F9] rounded-full h-fit my-auto ${
          //     show ? "ml-4 w-2/4" : "ml-6 w-2/3"
          //   }`}
          // >
            {/* <FaSearch
              onClick={() => {
                console.log("click search");
              }}
              className={`ml-4 my-auto md:w-7 md:h-7 h-4 w-4
               text-color-main-whith cursor-pointer  active:text-color-main  block `}
            />

            <input
              type="text"
              name="price"
              className="block w-full text-gray-900  my-auto rounded-full bg-[#F1F3F9] truncate
               md:py-3 md:mx-8  md:pr-20 md:text-md 
               py-2 mx-2  pr-16 text-sm
           placeholder:text-[#666C79] sm:text-sm sm:leading-6 focus:outline-none"
              placeholder="Search..."
              // onChange={handleSearch}
            />
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <p>hello</p>
            </Popper> 
          </div>*/}
          <FaSearch
            onClick={() => {
              console.log("click search");
            }}
            className={`ml-8 my-auto md:w-7 md:h-7 h-4 w-4
       text-color-main-whith cursor-pointer  active:text-color-main  block `}
          />
          <SerachNav show={show} />
          {/* ======================== /Search =================== */}
        </div>
      </div>
      <div className="flex flex-row w-screen bg-color-main relative">
        <div
          className={`absolute  top-0 z-20 transition-all duration-300 ease-in-out overflow-hidden
          ${show ? "left-0" : "-left-full"} 
          2xl:left-0
          `}
        >
          <SideBar />
        </div>
        <div
          className={` w-screen  m-0 bg-color-main transition-all duration-300 ease-in-out overflow-hidden min-[0px]:pl-0
          ${show ? "md:pl-32" : "md:pl-0"} 
          2xl:pl-20
        `}
        >
          {prompt.children}
        </div>
      </div>
    </div>
  );
}
