"use client";

import NavBarProtected from "@/app/components/navBar/NavBarProtected";

export default function ProtectedLayout(prompt: { children: React.ReactNode }) {
  return <NavBarProtected>{prompt.children}</NavBarProtected>;
}
