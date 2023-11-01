"use client";

import NavBarProtected from "@/components/navBar/NavBarProtected";

export default function ProtectedLayout(prompt: { children: React.ReactNode }) {
  return <NavBarProtected>{prompt.children}</NavBarProtected>;
}
