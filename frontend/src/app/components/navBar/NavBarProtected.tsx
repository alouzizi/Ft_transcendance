'use client';
import { ReactNode, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import SerachNav from './search/NavSearch';
import SideBar from './sideBar/SideBar';
export default function NavBarProtected(prompt: { children: ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="flex flex-col  h-screen text-white bg-color-main">
        <div className={` md:h-20 bg-color-main-dark z-1  `}>
          <div
            className={` flex flex-row justify-items-start  my-auto  md:h-20  w-full
           bg-color-main-dark z-10  ${show ? 'pl-20 sm:pl-24 md:pl-28 ' : ''}
          transition-all duration-300 ease-in-out 
        `}
          >
            <FiMenu
              onClick={() => {
                setShow((prev) => !prev);
              }}
              className={`${show ? 'ml-4 ' : 'ml-4 md:ml-12'
                }  transition-all duration-300 ease-in-out  my-auto md:w-8 md:h-8 h-7 w-7 text-gray-400 cursor-pointer  hover:text-white  block 2xl:hidden `}
            />
            <SerachNav />
          </div>
        </div>

        <div className="flex flex-row w-screen bg-color-main relative z-10">
          <div
            className={`absolute  top-0 z-20 transition-all duration-300 ease-in-out overflow-hidden
          ${show ? 'left-0' : '-left-full'} 
          2xl:left-0
          `}
          >
            <SideBar />
          </div>
          <div
            className={` w-screen  m-0 bg-color-main transition-all duration-300 ease-in-out overflow-hidden pl-0
          ${show ? 'md:pl-32' : 'md:pl-0'} 
          2xl:pl-20
        `}
          ></div>
        </div>

        <div className="h-[100%]">{prompt.children}</div>
      </div>
    </div>
  );
}
