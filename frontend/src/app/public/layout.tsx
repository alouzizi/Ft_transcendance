"use client";

import NavBarPublic from "@/app/components/navBar/NavbarPublic";

export default function PublicLayout(prompt: { children: React.ReactNode }) {
  return <NavBarPublic>{prompt.children}</NavBarPublic>;
}
