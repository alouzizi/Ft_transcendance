"use client";

import NavBarProtected from "@/components/navBar/NavBarProtected";
<<<<<<< HEAD

export default function ProtectedLayout(prompt: { children: React.ReactNode }) {
  return <NavBarProtected>{prompt.children}</NavBarProtected>;
=======
import { GlobalContextProvider } from "./context/store";

export default function ProtectedLayout(prompt: { children: React.ReactNode }) {
  return (
    <NavBarProtected>
      <GlobalContextProvider>
        {prompt.children}
      </GlobalContextProvider>
    </NavBarProtected >
  )




>>>>>>> origin/lhoussin
}
