"use client";

import NavBarPublic from "@/components/navBar/NavbarPublic";


export default function AuthLayout(prompt: { children: React.ReactNode }) {
  return (
    <NavBarPublic>
      <div className="bg-color-main w-screen flex justify-center items-center h-screen py-16">
        <div className="bg-white p-8 w-[80%] md:[40%] max-w-sm h-fit  m-auto   rounded-md ">
          {prompt.children}
        </div>
      </div>
    </NavBarPublic>
  );
}
