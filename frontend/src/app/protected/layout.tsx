"use client";

import NavBarProtected from "@/app/components/navBar/NavBarProtected";
import { GlobalContextProvider } from "./context/store";

export default function ProtectedLayout(prompt: { children: React.ReactNode }) {
  return (
    <NavBarProtected>
      <GlobalContextProvider>{prompt.children}</GlobalContextProvider>
    </NavBarProtected>
  );
}
