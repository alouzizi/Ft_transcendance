"use client";

import AlertOpenAccount from "@/app/public/HomePage/components/alertOpenAcc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { IoMdMenu } from 'react-icons/io';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import NavLink from "./utils/NavLink";
import MenuOverlay from "./utils/MenuOverlay";

const navLinks: { pathname: string; title: string }[] = [
  {
    title: 'HOME',
    pathname: '/public/HomePage',
  },
  {
    title: 'ABOUT',
    pathname: '/public/AboutPage',
  },
  {
    title: 'CONTACT',
    pathname: '/public/ContactPage',
  },
];

export default function NavBarPublic(prompt: { children: ReactNode }) {
  const pathname = usePathname();
  const [openAlert, setOpenAlert] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(true);

  useEffect(() => { setNavbarOpen(false) }, [pathname]);
  return (
    <div className="flex flex-col  h-screen  text-white">
      <div className="w-full bg-color-main  flex flex-row justify-center items-center py-4 pt-4">
        <div className="container flex  flex-wrap items-center justify-between  ">

          <Link href="/public/HomePage">
            <img className="h-8" src="/PongMaster.svg" alt="PongMaster" />
          </Link>


          <div className="mobile-menu block md:hidden text-white">
            {!navbarOpen ? (
              <IoMdMenu
                size={35}
                className="cursor-pointer text-slate-400 hover:text-white"
                onClick={() => setNavbarOpen(true)}
              />
            ) : (
              <MdOutlineCancelPresentation
                size={35}
                className="cursor-pointer text-slate-400 hover:text-white"
                onClick={() => setNavbarOpen(false)}
              />
            )}
          </div>
          <div className="menu hidden md:block md:w-auto" id="navbar">
            <ul className="flex md:flex-row p-4 md:p-0 md:space-x-8 mt-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink href={link.pathname} title={link.title} />
                </li>
              ))}
            </ul>
          </div>


        </div>

      </div>
      <div className="mobile-menu block md:hidden">
        {navbarOpen && <MenuOverlay links={navLinks} />}
      </div>

      <AlertOpenAccount openAlert={openAlert} setOpenAlert={setOpenAlert} />

      {prompt.children}

    </div>
  );
}
