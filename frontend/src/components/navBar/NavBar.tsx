"use client";
import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import NavBarProtected from "./NavBarProtected";
import NavBarPublic from "./NavbarPublic";
import Providers from "@/app/context/providers";
export default function NavBar(prompt: { children: ReactNode }) {
  const { data: session } = useSession();

  // console.log(session);
  if (session && session.user) {
    return <NavBarProtected>{prompt.children}</NavBarProtected>;
  }
  return <NavBarPublic>{prompt.children}</NavBarPublic>;
}
